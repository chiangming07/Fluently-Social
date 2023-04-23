/* eslint-disable no-undef */
import "express-async-errors";

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
import { router as userAuthRoute } from "./routes/userAuth_route.js";
import { router as communityRoute } from "./routes/community_route.js";

app.use("/api/" + process.env.API_VERSION, [
  chatRoute,
  userAuthRoute,
  communityRoute,
]);

// Error handling
import { errorHandler } from "./middleware/errorHandler.js";

app.use(errorHandler);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
