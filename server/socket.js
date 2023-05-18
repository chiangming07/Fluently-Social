import { Server } from "socket.io";
import { Cache } from "./utils/cache.js";

import { Message } from "./models/message_model.js";
import { updateLastMessage } from "./models/chatroom_model.js";

import { consumeFromQueue, publishToExchange } from "./utils/pubsub.js";

const io = new Server({
  cors: {
    origin: "*",
  },
});

const createSocketServer = (server) => {
  io.attach(server);
  consumeFromQueue();
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on("join-room", (currentRoomId) => {
      socket.join(currentRoomId);
    });

    socket.on("join-room-list", (chatroomList) => {
      chatroomList.forEach((list) => {
        socket.join(list.roomId);
      });
    });

    // 一對一聊天室
    socket.on("text message", async (message) => {
      const { roomId, senderId, content } = message;
      message.type = "text message";
      await publishToExchange("fanout_exchange", message);
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
        updateLastMessage(roomId, message.content);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("image message", async (message) => {
      const { roomId, senderId, content } = message;
      message.type = "image message";
      await publishToExchange("fanout_exchange", message);
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
        updateLastMessage(roomId, message.content);
      } catch (error) {
        console.error(error);
      }
    });

    // 匿名聊天
    socket.on("anonymous", () => {
      socket.emit("socketId", socket.id);
    });

    socket.on("anonymous join room", (roomId) => {
      socket.join(roomId);
    });

    socket.on("anonymous text message", async (message) => {
      message.type = "anonymous text message";
      await publishToExchange("fanout_exchange", message);
    });

    socket.on("anonymous image message", async (message) => {
      message.type = "anonymous image message";
      await publishToExchange("fanout_exchange", message);
    });

    socket.on("leave anonymous chatroom", async (message) => {
      const { socketId } = message;
      await Cache.hdel("anonymousChatRoom", socketId);
      message.type = "broadcast message";
      await publishToExchange("fanout_exchange", message);
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
