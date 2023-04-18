import { Message } from "../models/message_model.js";
// TODO: 做 paging
const getHistory = async (req, res) => {
  // TODO: query 資料庫的部分移到 model
  const paging = Number(req.query.paging) || 0;
  const { roomId } = req.query;
  const messageNum = 20;
  // TODO: 更新 User 裡的 lastRead
  const messages = await Message.find({ roomId }).sort({ createdAt: 1 });
  // .skip(paging > 0 ? (paging - 1) * messageNum : 0)
  // .limit(messageNum);
  res.send({ messages });
};

export { getHistory };

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
