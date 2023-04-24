import { v4 as uuidv4 } from "uuid";
import { Chatroom } from "../models/chatroom_model.js";
import { createChatroom } from "../models/user_model.js";

import { queryChatroomList } from "../models/chatroom_model.js";

// TODO: err handling
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
  try {
    const userId = req.params.userId;
    const chatroomList = await queryChatroomList(userId);
    // TODO: 整理
    return res.json(chatroomList);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
export { getRoomId, getChatroomList };
