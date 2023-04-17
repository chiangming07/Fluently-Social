import { v4 as uuidv4 } from "uuid";
import { Chatroom } from "../models/chatroom_model.js";
// TODO: err handling
const getRoomId = async (req, res) => {
  const { myId, partnerId } = req.body;
  const hasChatroom = await Chatroom.findOne({
    members: { $all: [myId, partnerId] },
  });
  console.log("hasChatroom", hasChatroom);
  let roomId = hasChatroom ? hasChatroom.roomId : uuidv4();
  if (!hasChatroom) {
    const newChatroom = new Chatroom({
      roomId,
      members: [myId, partnerId],
      lastMessageRead: new Map(),
    });
    await newChatroom.save();
  }
  return res.json({ roomId });
};

export { getRoomId };
