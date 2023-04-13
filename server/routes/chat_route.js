import express from "express";
const router = express.Router();

import { getRoomId } from "../controllers/chatroom_controller.js";

router.route("/chat/roomId").post(getRoomId);

export { router };
