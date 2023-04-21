import { mongoose, Schema } from "mongoose";
import { db } from "../database.js";
import bcrypt from "bcrypt";

import { CustomError } from "../middleware/errorHandler.js";

const userSchema = new Schema({
  provider: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "custom"],
  },
  speaking: [
    {
      language: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced", "native"],
        required: true,
      },
    },
  ],
  learning: [
    {
      language: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        required: true,
      },
    },
  ],
  topic: [{ type: String }],
  avatar: { type: String },
  online: { type: Boolean, default: true },
  chatroom: [
    {
      roomId: {
        type: String,
      },
      lastRead: {
        type: Date,
      },
    },
  ],
  loginAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

const registerUser = async (username, email, password, speaking, learning) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const user = {
      provider: "native",
      username,
      email,
      password,
      avatar:
        "https://image1.gamme.com.tw/news2/2017/52/41/qZqZo6SVk6ecq6Y.jpg",
      speaking,
      learning,
    };

    const [createdUser] = await User.create([user], { session });
    await session.commitTransaction();
    session.endSession();

    const { _id, avatar, online } = createdUser;
    return { _id, avatar, online };
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
    throw CustomError.CONFLICT("User email already exists.");
  }
};

const getUserInfo = (user) => {
  return {
    id: user._id,
    provider: user.provider,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    speaking: user.speaking,
    learning: user.learning,
    loginAt: user.loginAt,
    online: true,
  };
};

const validateUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw CustomError.UnauthorizedError("Invalid email.");

  const passwordMatched = await bcrypt.compare(password, user.password);

  if (!passwordMatched)
    throw CustomError.UnauthorizedError("Invalid password.");

  const filter = { _id: user._id };
  const update = { loginAt: new Date() };
  const updatedUser = await User.findOneAndUpdate(filter, update);

  return {
    user: getUserInfo(updatedUser),
  };
};

const updateUserPreference = async (email, speaking, learning, topic) => {
  const filter = { email };
  const update = { speaking, learning, topic };
  const updatedUser = await User.findOneAndUpdate(filter, update);

  return {
    user: getUserInfo(updatedUser),
  };
};

export { User, registerUser, validateUser, updateUserPreference };
