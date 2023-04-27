import express from "express";
const router = express.Router();

import { authentication } from "../middleware/authentication.js";

import {
  getRoomId,
  getChatroomList,
  getUploadURL,
} from "../controllers/chatroom_controller.js";
import { sendAbstract } from "../controllers/mailgun_controller.js";
import { getHistory } from "../controllers/chatHistory_controller.js";
import { searchHistory } from "../controllers/searchHistory_controller.js";
import {
  matchPartner,
  clearMatch,
} from "../controllers/anonymous_controller.js";

// TODO: 補上 authentication
router.route("/chat/room-id").post(getRoomId);
router.route("/chat/chatroom-list/:userId").get(getChatroomList);
router.route("/chat/abstract").post(sendAbstract);
router.route("/chat/history").get(getHistory);
router.route("/chat/search-history").get(searchHistory);
router.route("/chat/upload-s3").get(getUploadURL);

// anonymous
router.route("/chat/anonymous/match").post(matchPartner);
router.route("/chat/anonymous/clearMatch").delete(clearMatch);

export { router };
