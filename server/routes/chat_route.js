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

router.route("/chat/room-id").post(authentication, getRoomId);
router.route("/chat/chatroom-list/:userId").get(getChatroomList);
router.route("/chat/abstract").post(authentication, sendAbstract);
router.route("/chat/history").get(authentication, getHistory);
router.route("/chat/search-history").get(authentication, searchHistory);
router.route("/chat/upload-s3").get(authentication, getUploadURL);

// anonymous
router.route("/chat/anonymous/match").post(authentication, matchPartner);
router.route("/chat/anonymous/clearMatch").delete(authentication, clearMatch);

export { router };
