require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");

PORT = process.env.PORT;
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(PORT, () => {
  console.log(`Server is Listening in Port ${PORT}`);
});
