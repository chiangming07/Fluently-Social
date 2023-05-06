import express from "express";
const router = express.Router();

import { getAllUsers } from "../controllers/community_controller.js";
import { getNearbyUsers } from "../controllers/nearme_controller.js";

router.route("/community/all").post(getAllUsers);
router.route("/community/nearme").post(getNearbyUsers);

export { router };
