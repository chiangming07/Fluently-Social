import Message from "../models/schemas/message_schema.js";

const getHistory = async (req, res) => {
  const { roomId } = req.query;
  const messages = await Message.find({ roomId }).sort({ createdAt: 1 });
  res.send({ messages });
};

export { getHistory };
