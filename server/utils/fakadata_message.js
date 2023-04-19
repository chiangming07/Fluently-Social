import { Message } from "../models/message_model.js";

const messages = [
  {
    senderId: "64393de97ab30f3363549c78",
    content: {
      type: "text",
      data: "Hi, how's it going?",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "609c11fc17d9fc24d036c45e",
    content: {
      type: "text",
      data: "I'm doing well, thanks! How about you?",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "64393de97ab30f3363549c78",
    content: {
      type: "text",
      data: "I'm good too, thanks. Where are you from?",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "609c11fc17d9fc24d036c45e",
    content: {
      type: "text",
      data: "I'm from the United States. And you?",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "64393de97ab30f3363549c78",
    content: {
      type: "text",
      data: "I'm from Taiwan. I really wanna practice English with you, and of course I can help with Chinese!",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "609c11fc17d9fc24d036c45e",
    content: {
      type: "text",
      data: "That sounds great! I would love to practice Chinese with you too.",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "64393de97ab30f3363549c78",
    content: {
      type: "text",
      data: "Awesome! So, what kind of things do you like to talk about?",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "609c11fc17d9fc24d036c45e",
    content: {
      type: "text",
      data: "I'm interested in a lot of things, like sports, music, and movies. How about you?",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "64393de97ab30f3363549c78",
    content: {
      type: "text",
      data: "I like those things too, but I also like to talk about travel and different cultures. Have you ever been to Taiwan?",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "609c11fc17d9fc24d036c45e",
    content: {
      type: "text",
      data: "No, I haven't had the chance to visit Taiwan yet, but I would love to go someday. Can you tell me more about what it's like there?",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "64393de97ab30f3363549c78",
    content: {
      type: "text",
      data: "Sure! Taiwan is a beautiful country with lots of amazing food and friendly people. It's also a great place to experience traditional Chinese culture. There are many famous tourist attractions, such as Taipei 101, Sun Moon Lake, and Taroko Gorge. You should definitely come visit!",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "609c11fc17d9fc24d036c45e",
    content: {
      type: "text",
      data: "That sounds wonderful! I'll definitely have to plan a trip soon. Have you ever been to the United States?",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "64393de97ab30f3363549c78",
    content: {
      type: "text",
      data: "Yes, I have been to the United States a few times. I've been to New York City, Los Angeles, and San Francisco. They were all amazing cities, but very different from each other. Do you have a favorite city in the United States?",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "609c11fc17d9fc24d036c45e",
    content: {
      type: "text",
      data: "I've been to a few cities in the US, but I think my favorite is probably San Francisco. It's such a beautiful city with lots of great food and things to do. Have you tried any of the food in the US that you really liked?",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "64393de97ab30f3363549c78",
    content: {
      type: "text",
      data: "Yes, I love hamburgers and pizza! They are both very popular in the US, and there are so many different types to try. What about you? What's your favorite food?",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "609c11fc17d9fc24d036c45e",
    content: {
      type: "text",
      data: "I love Chinese food, especially dumplings and noodle dishes. Have you tried any Chinese dishes that you really like?",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "64393de97ab30f3363549c78",
    content: {
      type: "text",
      data: "Yes, I love Chinese food too! Some of my favorites are hot pot, Kung Pao chicken, and dumplings.",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "64393de97ab30f3363549c78",
    content: {
      type: "text",
      data: "btw, have you seen the new movie that just came out? I heard it's really good!",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "609c11fc17d9fc24d036c45e",
    content: {
      type: "text",
      data: "No, I haven't seen it yet. What's it about?",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "64393de97ab30f3363549c78",
    content: {
      type: "text",
      data: "It's a romantic comedy about two people who meet by chance and fall in love. I won't give away too much, but it's really sweet and funny. You should definitely check it out!",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "609c11fc17d9fc24d036c45e",
    content: {
      type: "text",
      data: "That sounds like a nice movie. I'll add it to my list. Have you watched any other good movies recently?",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "64393de97ab30f3363549c78",
    content: {
      type: "text",
      data: "Yes, I saw a really great documentary about wildlife conservation last week. It was really informative and made me want to learn more about the topic. Have you watched any interesting documentaries lately?",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "609c11fc17d9fc24d036c45e",
    content: {
      type: "text",
      data: "Actually, yes! I watched a documentary about the history of the Great Wall of China. It was really fascinating to learn about the construction and purpose of such a famous landmark. Do you have any other documentary recommendations?",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
  {
    senderId: "64393de97ab30f3363549c78",
    content: {
      type: "text",
      data: "Definitely! If you're interested in space, you should check out the documentary 'Apollo 11'. It's all about the first moon landing and has some amazing footage. I think you'd really enjoy it.",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
];

const createMessages = async (messages) => {
  try {
    for (const message of messages) {
      await Message.create(message);
    }
  } catch (e) {
    console.log(e);
  }
};

// createMessages(messages);
