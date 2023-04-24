import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// --- model: "gpt-3.5-turbo" ---
const getAbstract = async (conversation, senderId) => {
  const messages = [
    {
      role: "user",
      content: `請站在 ${senderId} 的立場，把以下對話內容進行中英文摘要，此外，你需要條列出文中最困難的10個單字及可能與主題相關的5個額外單字或片語，每個單字要用1~10依序條列(包含將中文及另一語言翻譯成中文的對照表，如：面白い：有趣)。
      格式請用\n\n🌱 本日摘要：...\n\n🌱 本日單字：...\n\n🌱 額外學習：...:\n\n${conversation}"`,
    },
  ];
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.2,
    max_tokens: 500,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  const abstract = response.data.choices[0].message.content;
  return abstract;
};

export { getAbstract };
