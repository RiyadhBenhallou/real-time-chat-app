import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "https://ceddeb97-b370-4ab4-992a-18740d698be3-00-9f7v099mjcbh.kirk.replit.dev",
    methods: ["GET", "POST"] // You can specify allowed methods if necessary
  }
});

io.on("connection", (socket) => {
  socket.on("send-message", (data) => {
    const messageWithSender = {
      ...data,
      senderId: socket.id,  // Add sender's ID to the message data
    };
    socket.broadcast.emit("receive-message", messageWithSender);
    socket.emit("receive-message", messageWithSender); // Emit to the sender as well
  });
});

httpServer.listen(3000, () => console.log('Server running on port 3000'));
