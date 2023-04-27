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
// Socket settings
createSocketServer(server);

// Cookie settings
import cookieParser from "cookie-parser";

// Middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// API routes
import { router as chatRoute } from "./routes/chat_route.js";
import { router as userAuthRoute } from "./routes/userAuth_route.js";
import { router as communityRoute } from "./routes/community_route.js";

app.get("/check", (req, res) => {
  console.log("health checking...");
  res.status(200).send("OK");
});

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
