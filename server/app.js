/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

// Express Initialization
import express from "express";
const app = express();

const port = process.env.PORT || 8080;

// Socket Initialization
import { createServer } from "http";
import { createSocketServer } from "./socket.js";
const server = createServer(app);
// Socket 設定
createSocketServer(server);

// Middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API routes
import { router as chatRoute } from "./routes/chat_route.js";

app.use("/api/" + process.env.API_VERSION, [chatRoute]);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
