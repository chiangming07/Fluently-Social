import { CustomError } from "../middleware/errorHandler.js";
import { registerUser } from "../models/user_model.js";

import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const validatePassword = (password) => {
  if (
    !validator.isStrongPassword(password, {
      minUppercase: 0,
      minSymbols: 0,
    })
  )
    throw CustomError.BadRequestError(
      "Password must be at least 8 characters long with 1 lowercase and 1 numeric character"
    );
};

const generateAccessToken = ({ username, email, avatar }) => {
  return jwt.sign({ username, email, avatar }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRED,
  });
};

const signUp = async (req, res) => {
  let { provider, username, email, password, speaking, learning } = req.body;
  if (!username || !email || !password || !speaking || !learning)
    throw CustomError.BadRequestError("All fields are required.");
  if (!validator.isLength(username, { min: 2, max: 45 }))
    throw CustomError.BadRequestError(
      "Username must be between 2-45 characters."
    );
  if (!validator.isEmail(email))
    throw CustomError.BadRequestError("Invalid email format.");
  validatePassword(password);
  password = await bcrypt.hash(password, +process.env.SALT);
  //   const { id, avatar } = await registerUser(
  const { _id, avatar, online } = await registerUser(
    username,
    email,
    password,
    speaking,
    learning
  );
  const payload = { username, email, speaking, learning };
  const accessToken = generateAccessToken(payload);
  return res.json({
    data: {
      accessToken,
      accessExpired: +process.env.JWT_ACCESS_EXPIRED,
      user: {
        _id,
        provider,
        username,
        email,
        avatar,
        speaking,
        learning,
        online,
      },
    },
  });
};

export { signUp };
