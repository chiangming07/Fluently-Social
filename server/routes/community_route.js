import express from "express";
const router = express.Router();

import { authentication } from "../middleware/authentication.js";

import { getAllUsers } from "../controllers/community_controller.js";

router.route("/community/all").post(getAllUsers);

export { router };
