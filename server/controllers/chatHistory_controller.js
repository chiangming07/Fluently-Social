import { Message } from "../models/message_model.js";

// TODO: 做 paging
const getHistory = async (req, res) => {
  const paging = Number(req.query.paging) || 0;
  const { roomId } = req.query;
  const messageNum = 20;
  // 將 unreadMessages 陣列中的訊息標記為已讀
  //   const unreadMessages = chatRoom.unreadMessages;
  //   chatRoom.unreadMessages = [];
  //   await chatRoom.save();

  // 取得聊天室中的所有訊息
  const messages = await Message.find({ roomId }).sort({ createdAt: 1 });
  // .skip(paging > 0 ? (paging - 1) * messageNum : 0)
  // .limit(messageNum);
  res.send({ messages });
};

export { getHistory };

//   取得最後一則訊息的 ID
//   const lastMessage = await Message.findOne({ roomId: newMessage.roomId })
// .sort({ createdAt: -1 })
// .limit(1);
//   const lastMessageId = lastMessage ? lastMessage._id : null;
//   將最後一則訊息的 ID 更新到聊天室的 lastMessageRead Map 中

//   const update = { $set: {} };
//   update.$set[`lastMessageRead.${newMessage.senderId}`] = lastMessageId;
//   await ChatRoom.findByIdAndUpdate(newMessage.roomId, update);

// const roomId = "49b35ea0-a26d-4e38-914b-aa508479fd1c";
// const messageNum = 20;
// const paging = 2;
// const messages = await Message.find({ roomId })
//   .sort({ createdAt: 1 })
//   .skip(paging > 0 ? (paging - 1) * messageNum : 0)
//   .limit(messageNum);
// console.log(messages);
// messages.map((message) => {
//   let timestamp = message.createdAt;
//   const date = dayjs(timestamp);
//   const time = date.format("YYYY/MM/DD HH:mm:ss");
//   console.log(time);
// });
