import dayjs from "dayjs";

import Message from "./schemas/message_schema.js";

const saveMessage = async (senderId, content, roomId, type) => {
  const message = new Message({
    senderId,
    content: {
      type,
      data: content,
    },
    roomId,
  });
  await message.save();
};

const getMessages = async (roomId) => {
  const today = dayjs().startOf("day");
  const messages = await Message.aggregate([
    {
      $match: {
        roomId,
        "content.type": "text",
        createdAt: { $gte: today.toDate() },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "senderId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $project: {
        username: {
          $arrayElemAt: ["$user.username", 0],
        },
        content: "$content.data",
        _id: 0,
      },
    },
  ]);
  const messageArr = messages.map(
    (message) => `${message.username}: ${message.content}`
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

export { saveMessage, getMessages, queryHistory };
