import { mongoose, Schema } from "mongoose";
import { db } from "../database.js";
import { Cache } from "../utils/cache.js";

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
        default: Date.now,
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
    age: user.age || "Not specified",
    gender: user.gender || "Not specified",
    avatar: user.avatar,
    speaking: user.speaking,
    learning: user.learning,
    topic: user.topic,
    chatroom: user.chatroom,
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
  const updatedUser = await User.findOneAndUpdate(filter, update, {
    new: true,
  });

  return {
    user: getUserInfo(updatedUser),
  };
};

const updateUserPreference = async (_id, speaking, learning, topic = []) => {
  const filter = { _id };
  const update = { speaking, learning, topic };
  const updatedUser = await User.findOneAndUpdate(filter, update, {
    new: true,
  });

  await Cache.del(`userTopics:${_id}`);
  if (topic.length > 0) {
    await Cache.sadd(`userTopics:${_id}`, topic);
  }

  return {
    user: getUserInfo(updatedUser),
  };
};

const queryAllUsers = async (speaking, learning) => {
  const users =
    speaking.length < 1 || learning.length < 1
      ? await User.find(
          {},
          {
            username: 1,
            avatar: 1,
            online: 1,
            learning: 1,
            speaking: 1,
            topic: 1,
          }
        )
      : await User.find(
          {
            $and: [
              {
                $or: speaking.map((pair) => ({
                  "learning.language": pair.language,
                })),
              },
              {
                $or: learning.map((pair) => ({
                  "speaking.language": pair.language,
                })),
              },
              {
                loginAt: {
                  $gte: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                },
              },
            ],
          },
          {
            username: 1,
            avatar: 1,
            online: 1,
            learning: 1,
            speaking: 1,
            topic: 1,
          }
        );
  return users;
};

const queryNearbyUsers = async (nearbyUsers) => {
  const users = await User.find(
    {
      _id: { $in: nearbyUsers },
      loginAt: { $gte: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
    },
    {
      username: 1,
      avatar: 1,
      online: 1,
      learning: 1,
      speaking: 1,
      topic: 1,
    }
  );
  return users;
};

const createChatroom = async (roomId, myId, partnerId) => {
  const update = {
    $set: {
      chatroom: {
        roomId,
      },
    },
  };
  await User.updateMany({ _id: { $in: [myId, partnerId] } }, update);
};

const updateUserAvatar = async (_id, avatar) => {
  const result = await User.updateOne({ _id }, { $set: { avatar } });
  if (!result.acknowledged)
    throw CustomError.BadRequestError("Failed to update avatar.");
  return true;
};

export {
  User,
  registerUser,
  validateUser,
  updateUserPreference,
  queryAllUsers,
  queryNearbyUsers,
  createChatroom,
  updateUserAvatar,
};
