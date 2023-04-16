import { mongoose, Schema } from "mongoose";
import { db } from "../database.js";

const messageSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    // ref: "User",
    required: true,
  },
  content: {
    type: {
      type: String,
      enum: ["text", "image"],
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
  },
  roomId: {
    type: String,
    ref: "Chatoom",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Message = mongoose.model("Message", messageSchema);

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
      data: "Yes, I love Chinese food too! Some of my favorites are hot pot, Kung Pao chicken, and dumplings. Do you have a favorite Chinese dish that you would recommend?",
    },
    roomId: "49b35ea0-a26d-4e38-914b-aa508479fd1c",
  },
];

// try {
//   const result = await Message.create(messages);
//   console.log(result);
// } catch (error) {
//   console.error(error);
// }
