import { mongoose } from "mongoose";
import User from "./schemas/user_schema.js";

import bcrypt from "bcrypt";

import { CustomError } from "../middleware/errorHandler.js";

const checkEmailExist = async (email) => {
  const response = await User.findOne({ email });
  return response;
};

const registerUser = async (username, email, password, speaking, learning) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const user = {
      provider: "native",
      username,
      email,
      password,
      avatar: "",
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
              // Temporarily disable the restriction of last-login-time for testers.
              // {
              //   loginAt: {
              //     $gte: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
              //   },
              // },
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
      // Temporarily disable the restriction of last-login-time for testers.
      // loginAt: { $gte: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
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

const queryUserNameAndEmail = async (userId) => {
  const user = await User.findOne(
    { _id: userId },
    { _id: 0, username: 1, email: 1 }
  );
  return user;
};

export {
  checkEmailExist,
  registerUser,
  validateUser,
  updateUserPreference,
  queryAllUsers,
  queryNearbyUsers,
  createChatroom,
  updateUserAvatar,
  queryUserNameAndEmail,
};
