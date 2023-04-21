import { CustomError } from "../middleware/errorHandler.js";
import { registerUser, validateUser } from "../models/user_model.js";

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

  const { id, avatar, online } = await registerUser(
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
      id,
      provider,
      username,
      email,
      speaking,
      learning,
      online,
    },
  });
};

const nativeSignIn = async (email, password) => {
  if (!email || !password)
    throw CustomError.BadRequestError("Email and password are required.");

  const { user } = await validateUser(email, password);
  return user;
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  // TODO: 如果有提供不同的登入管道，要在這邊先判斷 provider
  const user = await nativeSignIn(email, password);
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

export { signUp, signIn };