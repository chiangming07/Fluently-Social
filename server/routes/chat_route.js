import express from "express";
const router = express.Router();

import { getRoomId } from "../controllers/chatroom_controller.js";
import { sendAbstract } from "../controllers/mailgun_controller.js";

router.route("/chat/roomId").post(getRoomId);
router.route("/chat/abstract").post(sendAbstract);

export { router };
