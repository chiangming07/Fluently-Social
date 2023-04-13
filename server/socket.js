import { Server } from "socket.io";

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
    socket.on("chat message", (msg) => {
      console.log("message: " + msg);
      io.to(msg[0]).emit("chat message", msg[1]);
    });
    // TODO: 目前為 base64，到時上傳 S3
    socket.on("image", (msg) => {
      io.to(msg[0]).emit("dataUrl", msg[1]);
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
