import formData from "form-data";
import Mailgun from "mailgun.js";
import dotenv from "dotenv";
dotenv.config();
import { getAbstract } from "../utils/chatgpt.js";
import { date } from "../utils/date.js";
import { Message, getMessages } from "../models/message_model.js";

const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const sendAbstract = async (req, res) => {
  const { roomId, senderId } = req.body;
  const conversation = await getMessages(roomId, senderId);
  const abstract = await getAbstract(conversation, senderId);

  const messageData = {
    from: "Fluently 語言交換 <chiangming07@gmail.com>",
    to: "chiangming07@gmail.com",
    subject: `🌱 [Fluently] ${date}- 小 Chat 幸摘要`,
    text: `Hi there: \n\n以下是您於 ${date} 的聊天摘要。\n\n${abstract}
  \n十分感謝您使用小 Chat 幸摘要服務，祝福您有美好的一天🥰 \n\nBest regards,\nFluently`,
  };
  try {
    const response = await client.messages.create(
      process.env.DOMAIN,
      messageData
    );
    console.log(response.status);
    return res.json({ status: response.status });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export { sendAbstract };
