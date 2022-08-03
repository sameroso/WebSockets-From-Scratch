import { createServer } from "http";
import crypto from "crypto";

const PORT = 1337;

const WEBSOCKET_KEY_PREFIX = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

const server = createServer((req, res) => {
  res.writeHead(200);
  res.end("hey there");
}).listen(PORT, () => {
  console.log("sertver listening to ", PORT);
});

server.on("upgrade", onSocketUpgrade);

function onSocketUpgrade(req, socket, head) {
  const { "sec-websocket-key": webCLientSocketKey } = req.headers;
  console.log(`${webCLientSocketKey} connected!`);
  const headers = prepareHandShakeHeaders(webCLientSocketKey);
  socket.write(headers);
}

function prepareHandShakeHeaders(id) {
  const acceptKey = createSocketAccept(id);
  const headers = [
    "HTTP/1.1 101 Switching Protocols",
    "Upgrade: websocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${acceptKey}`,
    "",
  ]
    .map((line) => line.concat("\r\n"))
    .join("");
  return headers;
}

function createSocketAccept(id) {
  const shaum = crypto.createHash("sha1");
  shaum.update(id + WEBSOCKET_KEY_PREFIX);
  return shaum.digest("base64");
}

// error handling to keep server on
["uncaughtException", "unhandledRejection"].forEach((ev) =>
  process.on(ev, (err) => {
    console.error(
      `something bad happened! event: ${ev}, msg: ${err.stack || err}`
    );
  })
);
