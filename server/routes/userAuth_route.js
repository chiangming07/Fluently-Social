import express from "express";
const router = express.Router();

import { signUp } from "../controllers/userAuth_controller.js";

router.route("/user/sign-up").post(signUp);

export { router };
