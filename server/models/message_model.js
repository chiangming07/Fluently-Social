import { mongoose, Schema } from "mongoose";
import { db } from "../database.js";

const messageSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: {
      type: String,
      enum: ["text", "image"],
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
  },
  roomId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

const getMessages = async (roomId, senderId, date) => {
  const messages = await Message.aggregate([
    {
      $match: {
        roomId,
        "content.type": "text",
        createdAt: { $gte: new Date(date) },
      },
    },
    {
      $project: {
        content: "$content.data",
        senderId: {
          $substr: [{ $toString: "$senderId" }, 10, -1],
        },
        _id: 0,
      },
    },
  ]);
  // TODO: 把 senderId 關聯到 username
  const messageArr = messages.map(
    (message) => `${message.senderId}: ${message.content}`
  );

  return messageArr.join("\n");
};

const queryHistory = async (roomId, keyword) => {
  const searchResult = await Message.aggregate([
    {
      $search: {
        index: "queryHistory",
        text: {
          query: `${keyword}`,

          path: "content.data",
        },
        highlight: {
          path: "content.data",
        },
      },
    },
    { $match: { roomId } },
    {
      $project: {
        senderId: 1,
        createdAt: 1,
        highlights: { $meta: "searchHighlights" },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
  return searchResult;
};

export { Message, getMessages, queryHistory };
