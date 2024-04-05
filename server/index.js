import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    // origin: "https://ceddeb97-b370-4ab4-992a-18740d698be3-00-9f7v099mjcbh.kirk.replit.dev",
    origin: "http://localhost:5173/",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    const { room } = data;
    if (room) {
      socket.join(room);
      console.log(`User ${socket.id} joined room ${room}`);
    } else {
      socket.emit("error", { message: "Room not specified." });
    }
  });

  socket.on("send-message", (data) => {
    const { room, message } = data;
    if (room && message) {
      const messageWithSender = {
        ...data,
        senderId: socket.id,
      };
      socket.to(room).emit("receive-message", messageWithSender);
      socket.emit("receive-message", messageWithSender);
    } else {
      socket.emit("error", { message: "Room or message not specified." });
    }
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
    // Handle cleaning up any resources or removing the user from rooms
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

