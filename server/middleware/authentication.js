import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

import { CustomError } from "../middleware/errorHandler.js";

const authentication = (req, res, next) => {
  if (!req.headers["authorization"])
    throw CustomError.UnauthorizedError("No token.");

  const token = req.headers["authorization"].split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) throw CustomError.ForbiddenError("Invalid token.");
    req.payload = payload;
    next();
  });
};

export { authentication };
