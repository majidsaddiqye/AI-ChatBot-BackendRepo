require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require("./src/services/ai.service");

PORT = process.env.PORT;
const httpServer = createServer(app);
const io = new Server(httpServer);

const chatHistory = [];

io.on("connection", (socket) => {
  console.log("A User Connected");

  socket.on("ai-message", async (data) => {
    
    chatHistory.push({
      role: "user",
      parts: [{ text: data }],
    });

    const response = await generateResponse(chatHistory);

    chatHistory.push({
      role: "model",
      parts: [{ text: response }],
    });

    socket.emit("ai-message-response", { response });
  });

  socket.on("disconnect", () => {
    console.log("A User DisConnected");
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is Listening in Port ${PORT}`);
});
