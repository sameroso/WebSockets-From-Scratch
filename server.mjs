import { createServer } from "http";

const PORT = 1337;

createServer((req, res) => {
  res.writeHead(200);
  res.end("hey there");
}).listen(PORT, () => {
  console.log("sertver listening to ", PORT);
});
