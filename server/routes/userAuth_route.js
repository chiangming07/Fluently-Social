import express from "express";
const router = express.Router();

import {
  signUp,
  signIn,
  //   getUserProfile
} from "../controllers/userAuth_controller.js";

router.route("/user/sign-up").post(signUp);
router.route("/user/sign-in").post(signIn);
// router.route("/user/profile").get(authentication(), getUserProfile);

export { router };
