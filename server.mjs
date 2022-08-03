import { createServer } from "http";

const PORT = 1337;

const server = createServer((req, res) => {
  res.writeHead(200);
  res.end("hey there");
}).listen(PORT, () => {
  console.log("sertver listening to ", PORT);
});

server.on("upgrade", (req, socket, headers) => {
  console.log({ req, socket, headers });
});

// error handling to keep server on
["uncaughtException", "unhandledRejection"].forEach((ev) =>
  process.on(ev, (err) => {
    console.error(
      `something bad happened! event: ${ev}, msg: ${err.stack || err}`
    );
  })
);
