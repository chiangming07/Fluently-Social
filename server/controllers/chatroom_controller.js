import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

import { Chatroom } from "../models/chatroom_model.js";
import { createChatroom } from "../models/user_model.js";
import { queryChatroomList } from "../models/chatroom_model.js";
import { generateUploadURL } from "../utils/s3.js";

const getRoomId = async (req, res) => {
  const { myId, partnerId } = req.body;
  const hasChatroom = await Chatroom.findOne({
    members: { $all: [myId, partnerId] },
  });
  let roomId = hasChatroom ? hasChatroom.roomId : uuidv4();
  if (!hasChatroom) {
    const newChatroom = new Chatroom({
      roomId,
      members: [myId, partnerId],
    });
    await newChatroom.save();
    createChatroom(roomId, myId, partnerId);
  }
  return res.json({ roomId });
};

const getChatroomList = async (req, res) => {
  const userId = req.params.userId;
  const chatroomList = await queryChatroomList(userId);

  const roomList = chatroomList.map((data) => {
    const { roomId, memberInfo, lastMessage } = data;
    return {
      roomId,
      lastMessage: {
        content: lastMessage?.content || null,
        time: lastMessage?.time || null,
      },
      memberInfo: {
        _id: memberInfo._id,
        username: memberInfo.username,
        avatar: memberInfo.avatar,
        online: memberInfo.online,
      },
    };
  });

  roomList.sort((b, a) => {
    return a.lastMessage.time - b.lastMessage.time;
  });

  const sortedRoomList = roomList.map((room) => {
    return {
      ...room,
      lastMessage: {
        ...room.lastMessage,
        time: dayjs(room.lastMessage.time).format("YYYY/MM/DD HH:mm"),
      },
    };
  });

  return res.json(sortedRoomList);
};

const getUploadURL = async (req, res) => {
  const { URL, imageName } = await generateUploadURL();
  res.json({ URL, imageName });
};

export { getRoomId, getChatroomList, getUploadURL };
