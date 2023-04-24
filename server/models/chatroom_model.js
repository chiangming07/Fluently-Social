import { mongoose, Schema } from "mongoose";
import { db } from "../database.js";

const chatroomSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      required: true,
    },
  ],
  // lastMessageRead: {
  //   type: Map,
  //   of: Schema.Types.ObjectId,
  // },
  lastMessage: {
    content: {
      type: String,
    },
    time: {
      type: Date,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chatroom = mongoose.model("Chatroom", chatroomSchema);

const updateLastMessage = async (roomId, content) => {
  const now = new Date();
  const result = await Chatroom.updateOne(
    { roomId },
    { $set: { lastMessage: { content, time: now } } }
  );
  return result;
};

const queryChatroomList = async (userId) => {
  const ObjectId = mongoose.Types.ObjectId;
  userId = new ObjectId(userId);
  const chatroomList = await Chatroom.aggregate([
    {
      $match: {
        members: userId,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "members",
        foreignField: "_id",
        as: "membersInfo",
      },
    },
    {
      $unwind: "$membersInfo",
    },
    {
      $match: {
        "membersInfo._id": { $ne: userId },
      },
    },
    {
      $group: {
        _id: "$_id",
        roomId: { $first: "$roomId" },
        lastMessage: { $first: "$lastMessage" },
        memberInfo: {
          $first: {
            _id: "$membersInfo._id",
            username: "$membersInfo.username",
            avatar: "$membersInfo.avatar",
            online: "$membersInfo.online",
          },
        },
      },
    },
  ]);
  return chatroomList;
};

export { Chatroom, updateLastMessage, queryChatroomList };
