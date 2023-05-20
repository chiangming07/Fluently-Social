import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

import { CustomError } from "../middleware/errorHandler.js";
import {
  checkEmailExist,
  registerUser,
  validateUser,
} from "../models/user_model.js";

const validatePassword = (password) => {
  if (
    !validator.isStrongPassword(password, {
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
    })
  )
    throw CustomError.BadRequestError(
      "Password must be at least 8 characters."
    );
};

const generateAccessToken = ({ provider, username, email, avatar }) => {
  return jwt.sign(
    { provider, username, email, avatar },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRED,
    }
  );
};

const signUp = async (req, res) => {
  let { provider, username, email, password, speaking, learning, step } =
    req.body;

  if (!username || !email || !password)
    throw CustomError.BadRequestError("All fields are required.");
  if (!validator.isLength(username, { min: 2, max: 14 }))
    throw CustomError.BadRequestError(
      "Username must be between 2-14 characters."
    );
  if (!validator.isEmail(email))
    throw CustomError.BadRequestError("Invalid email format.");

  validatePassword(password);
  const doesEmailExist = await checkEmailExist(email);
  if (doesEmailExist) throw CustomError.CONFLICT("User email already exists.");

  if (step === "first") return res.json(true);

  if (!speaking || !learning)
    throw CustomError.BadRequestError(
      "Both speaking languages and learning languages are mandatory."
    );

  password = await bcrypt.hash(password, +process.env.SALT);

  const { _id, avatar, online } = await registerUser(
    username,
    email,
    password,
    speaking,
    learning
  );
  const payload = { provider, username, email, avatar };
  const accessToken = generateAccessToken(payload);

  return res.json({
    accessToken,
    accessExpired: +process.env.JWT_ACCESS_EXPIRED,
    user: {
      id: _id,
      provider,
      username,
      email,
      speaking,
      learning,
      online,
    },
  });
};

const nativeLogIn = async (email, password) => {
  if (!email || !password)
    throw CustomError.BadRequestError("Email and password are required.");

  const { user } = await validateUser(email, password);
  return user;
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  // If multiple login channels are available, the provider needs to be checked here first.
  const user = await nativeLogIn(email, password);
  const payload = {
    provider: user.provider,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
  };
  const accessToken = generateAccessToken(payload);
  return res.json({
    accessToken,
    accessExpired: +process.env.JWT_ACCESS_EXPIRED,
    user,
  });
};

const getUserProfile = async (req, res) => {
  return res.json({
    provider: req.payload.provider,
    username: req.payload.username,
    email: req.payload.email,
    avatar: req.payload.avatar,
  });
};

export { signUp, logIn, getUserProfile };
