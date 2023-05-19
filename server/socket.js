import { Server } from "socket.io";
import { Cache } from "./utils/cache.js";

import { saveMessage } from "./models/message_model.js";
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

    // Chat
    socket.on("text message", async (message) => {
      const { roomId, senderId, content } = message;
      message.type = "text message";
      await publishToExchange("fanout_exchange", message);
      saveMessage(senderId, content, roomId, "text");
      updateLastMessage(roomId, message.content);
    });

    socket.on("image message", async (message) => {
      const { roomId, senderId, content } = message;
      message.type = "image message";
      await publishToExchange("fanout_exchange", message);
      saveMessage(senderId, content, roomId, "image");
      updateLastMessage(roomId, message.content);
    });

    // Anonymouse Chat
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
      console.log("user disconnected");
    });
  });
};

const emitToRoom = (roomId, type, message) => {
  io.to(roomId).emit(type, message);
};

export { createSocketServer, emitToRoom };
