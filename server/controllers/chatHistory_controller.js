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
