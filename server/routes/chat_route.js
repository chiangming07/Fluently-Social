import express from "express";
const router = express.Router();

import { getRoomId } from "../controllers/chatroom_controller.js";
import { sendAbstract } from "../controllers/mailgun_controller.js";
import { getHistory } from "../controllers/chatHistory_controller.js";

router.route("/chat/roomId").post(getRoomId);
router.route("/chat/abstract").post(sendAbstract);
router.route("/chat/history").get(getHistory);

export { router };
