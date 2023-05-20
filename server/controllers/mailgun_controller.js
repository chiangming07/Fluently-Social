import dotenv from "dotenv";
dotenv.config();

import formData from "form-data";
import Mailgun from "mailgun.js";

import { getAbstract } from "../utils/chatgpt.js";
import getTodayDate from "../utils/date.js";
import { getMessages } from "../models/message_model.js";
import { queryUserNameAndEmail } from "../models/user_model.js";

const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const sendAbstract = async (req, res) => {
  const { roomId, senderId } = req.body;
  const conversation = await getMessages(roomId);
  if (!conversation) return res.json(false);

  const { username, email } = await queryUserNameAndEmail(senderId);
  const abstract = await getAbstract(conversation, username);
  const date = getTodayDate();
  const messageData = {
    from: "Fluently 語言交換 <chiangming07@gmail.com>",
    to: email,
    bcc: "chiangming07@gmail.com",
    subject: `🌱 [Fluently] ${date}- 小 Chat 幸摘要`,
    text: `Hi there: \n\n以下是您於 ${date} 的聊天摘要。
          \n(Here is the chat summary of your conversations on ${date}.)
          \n${abstract}
          \n十分感謝您使用小 Chat 幸摘要服務，祝福您有美好的一天🥰 
          \n(Thank you very much for using the Chat Summary service. Wishing you a wonderful day! 🥰)
          \n\nBest regards,\nFluently`,
  };
  await client.messages.create(process.env.DOMAIN, messageData);
  return res.json(true);
};

export { sendAbstract };
