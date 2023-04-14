import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();
// TODO: 要根據 post 進來的 userId 去查聊天室及當天時間去資料庫整理出 chat
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const chat = `你: こんにちは、最近忙しいんですか？
// Lisa: はい、最近は忙しいです。新しいプロジェクトに取り組んでいるため、毎日遅くまで働いています。
// 你: そうなんですか。頑張っていますね。そのプロジェクトについてもっと教えていただけますか？
// Lisa: はい、もちろんです。私たちは新しい製品の開発に取り組んでいます。その製品は、人工知能を活用して顧客のニーズに合わせたカスタマイズができるようになるものです。
// 你: すごいですね！人工知能の技術はどのように応用されるんですか？
// Lisa: たとえば、顧客が特定の商品を購入する際に、その商品に関連するアイテムやサービスを推奨することができます。また、過去の購入履歴から、その顧客が好む嗜好を予測することもできます。
// 你: それはとても便利ですね。でも、人工知能の技術はどのように開発されるんですか？
// Lisa: 人工知能の開発には、多くのデータと時間が必要です。まずは、多くのデータを収集し、それを解析してパターンを見つけます。そして、そのパターンをもとに、アルゴリズムを作成して人工知能を構築します。
// 你: そうなんですか。人工知能の技術って、すごく高度な技術ですよね。
// Lisa: はい、そうですね。人工知能の技術は、今後ますます発展していくことが予想されています。私たちも、その進化に合わせて、日々学習し、研究を進めていかなければなりません。
// 你: そのプロジェクト、成功することを願っています。ありがとうございました。
// Lisa: どういたしまして。私たちも、最大限の努力をして、成功に向けて取り組んでいきます。`;

// 英文對話例句
const conversation = `Lisa: Hey, have you heard about the recent controversy surrounding the new voting laws in the United States?
你: Yes, I have. It's been all over the news lately. What do you think about it?
Lisa: Well, I think it's a serious issue that has the potential to affect a lot of people's ability to vote. The new laws place more restrictions on voting, which could disproportionately affect minorities and low-income individuals.
你: Yeah, I've read that the laws include things like requiring ID to vote, limiting early voting, and making it harder to vote by mail. It seems like it could make it more difficult for some people to vote.
Lisa: Exactly. And the argument that these laws are necessary to prevent voter fraud doesn't really hold up. Voter fraud is already extremely rare, and these laws seem more like an attempt to suppress certain groups of voters.
你: I can see why you think that. It's definitely a complicated issue. Have there been any protests or demonstrations against the new laws?
Lisa: Yes, there have been several protests and demonstrations across the country. Some businesses have also spoken out against the laws, such as Major League Baseball, which recently moved its All-Star Game from Georgia in protest of the state's new voting laws.
你: That's really interesting. I hadn't heard about the baseball game being moved. It's good to see people taking a stand on this issue.
Lisa: Definitely. It's important for people to speak out when they see injustices happening. We all have a responsibility to protect our democracy and ensure that everyone's right to vote is protected.
你: I completely agree. It's important to stay informed about these issues and take action when we can. I actually learned a lot of new vocabulary from this conversation, like "disproportionately" and "injustices".
`;

// --- model: "gpt-3.5-turbo" ---
const messages = [
  // {
  //   role: "system",
  //   content: `請仔細讀每一個字並適當換行，假設你是繁體中文摘要系統，用英文為對話中的"你"整理出對話摘要後再整理出翻譯版本，並且條列出最困難的10個單字及可能與主題相關的5個額外單字或片語，每個單字要用1~10依序條列(包含將中文語言翻譯成中文的對照表，如：面白い：有趣)，格式請用 🌱 本日摘要：...\n🌱 本日單字：...\n🌱 額外學習：...`,
  // },
  {
    role: "user",
    content: `請仔細讀每一個字並適當換行，假設你是繁體中文摘要系統，用英文為對話中的"你"整理出對話摘要後再整理出翻譯版本，並且條列出文中最困難的10個單字及可能與主題相關的5個額外單字或片語，每個單字要用1~10依序條列(包含將中文語言翻譯成中文的對照表，如：面白い：有趣)，格式請用 🌱 本日摘要：...\n🌱 本日單字：...\n🌱 額外學習：...:\n\n${conversation}`,
  },
];

const getAbstract = async () => {
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

// const abstract = await getAbstract();
// console.log(abstract);

export { getAbstract };
