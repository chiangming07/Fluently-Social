import { v4 as uuidv4 } from "uuid";
import { Chatroom } from "../models/chatroom_model.js";
import { createChatroom } from "../models/user_model.js";
import dayjs from "dayjs";

import { queryChatroomList } from "../models/chatroom_model.js";

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
    const time = dayjs(lastMessage.time).format("YYYY/MM/DD HH:mm");
    return {
      roomId,
      lastMessage: { content: lastMessage.content, time },
      memberInfo: {
        _id: memberInfo._id,
        username: memberInfo.username,
        avatar: memberInfo.avatar,
        online: memberInfo.online,
      },
    };
  });

  roomList.sort((b, a) => {
    return new Date(a.lastMessage.time) - new Date(b.lastMessage.time);
  });

  return res.json(roomList);
};

export { getRoomId, getChatroomList };
