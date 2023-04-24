import { Server } from "socket.io";
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
    console.log("a user connected");
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
        console.log("Message saved successfully");
        updateLastMessage(roomId, content);
      } catch (error) {
        console.error(error);
      }
    });
    // TODO: 目前為 base64，到時上傳 S3
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
        updateLastMessage(roomId, content);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("disconnect", () => {
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
