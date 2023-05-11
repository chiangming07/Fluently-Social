import express from "express";
const router = express.Router();

import { authentication } from "../middleware/authentication.js";

import {
  updatePreference,
  updateAvatar,
} from "../controllers/userProfileUpdate_controller.js";

router.route("/user/update-preference").post(authentication, updatePreference);
router.route("/user/update-avatar").patch(authentication, updateAvatar);

export { router };
