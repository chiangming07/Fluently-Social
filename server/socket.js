import { Server } from "socket.io";
import { Cache } from "./utils/cache.js";

import { Message } from "./models/message_model.js";
import { updateLastMessage } from "./models/chatroom_model.js";

const io = new Server({
  cors: {
    origin: "*",
  },
});

const createSocketServer = (server) => {
  io.attach(server);
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      socket.emit("join-room-message", `You've join ${roomId} room`);
      io.sockets
        .to(roomId)
        .emit("room-broadcast", `${socket.id} has join this room`);
    });

    // 一對一聊天室
    socket.on("text message", (message) => {
      const { roomId, senderId, content } = message;
      console.log("message: " + content);
      io.to(roomId).emit("text message", message);
      try {
        const message = new Message({
          senderId,
          content: {
            type: "text",
            data: content,
          },
          roomId,
        });
        message.save();
        console.log("message.content", message.content);
        console.log("Message saved successfully");
        updateLastMessage(roomId, message.content);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("image message", (message) => {
      const { roomId, senderId, content } = message;
      io.to(roomId).emit("image message", message);
      try {
        const message = new Message({
          senderId,
          content: {
            type: "image",
            data: content,
          },
          roomId,
        });
        message.save();
        console.log("Message saved successfully");
        updateLastMessage(roomId, message.content);
      } catch (error) {
        console.error(error);
      }
    });

    // 匿名聊天
    socket.on("anonymous", (msg) => {
      console.log(msg);
      socket.emit("socketId", socket.id);
    });

    socket.on("anonymous join room", (roomId) => {
      socket.join(roomId);
    });

    socket.on("anonymous text message", (msg) => {
      const { roomId } = msg;
      io.to(roomId).emit("anonymous text message", msg);
    });

    socket.on("anonymous image message", (msg) => {
      const { roomId } = msg;
      io.to(roomId).emit("anonymous image message", msg);
    });

    socket.on("leave anonymous chatroom", async (msg) => {
      const { roomId, socketId } = msg;
      console.log(msg);
      await Cache.hdel("anonymousChatRoom", socketId);
      io.to(roomId).emit("broadcast message", msg);
    });

    socket.on("disconnect", () => {
      console.log(`User ${socket.id} disconnected.`);
      // TODO: 監測上下線
      console.log("user disconnected");
    });
  });
};

const getSocketServer = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

export { createSocketServer, getSocketServer };
