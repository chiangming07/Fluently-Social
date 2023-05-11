import express from "express";
const router = express.Router();

import { authentication } from "../middleware/authentication.js";

import {
  signUp,
  logIn,
  getUserProfile,
} from "../controllers/userAuth_controller.js";

router.route("/user/signup").post(signUp);
router.route("/user/login").post(logIn);
router.route("/user/profile").get(authentication, getUserProfile);

export { router };
