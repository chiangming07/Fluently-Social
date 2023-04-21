import { User } from "../models/user_model.js";

const users = [
  {
    provider: "native",
    username: "John",
    email: "johndoe@example.com",
    password: "password123",
    age: "30",
    gender: "male",
    learning: [
      {
        language: "Spanish",
        level: "beginner",
      },
    ],
    speaking: [
      {
        language: "English",
        level: "native",
      },
    ],
    topic: ["Sports", "Movies"],
    online: false,
  },
  {
    provider: "native",
    username: "Alice",
    email: "alice@example.com",
    password: "password123",
    age: "25",
    gender: "female",
    learning: [
      {
        language: "Spanish",
        level: "beginner",
      },
    ],
    speaking: [
      {
        language: "English",
        level: "native",
      },
    ],
    topic: ["Sports", "Music"],
    avatar: "https://image1.gamme.com.tw/news2/2017/52/41/qZqZo6SVk6ecq6Y.jpg",
    online: false,
  },
  {
    provider: "native",
    username: "Bob",
    email: "bob@example.com",
    password: "password123",
    age: "30",
    gender: "male",
    learning: [
      {
        language: "French",
        level: "intermediate",
      },
    ],
    speaking: [
      {
        language: "English",
        level: "native",
      },
    ],
    topic: ["Travel", "Food"],
    avatar: "https://image1.gamme.com.tw/news2/2017/52/41/qZqZo6SVk6ecq6Y.jpg",
    online: false,
  },
  {
    provider: "native",
    username: "Carol",
    email: "carol@example.com",
    password: "password123",
    age: "27",
    gender: "female",
    learning: [
      {
        language: "German",
        level: "advanced",
      },
    ],
    speaking: [
      {
        language: "English",
        level: "native",
      },
    ],
    topic: ["History", "Art"],
    avatar: "https://image1.gamme.com.tw/news2/2017/52/41/qZqZo6SVk6ecq6Y.jpg",
    online: false,
  },
  {
    provider: "native",
    username: "Jane",
    email: "janedoe@example.com",
    password: "password123",
    age: "25",
    gender: "female",
    learning: [
      {
        language: "French",
        level: "intermediate",
      },
    ],
    speaking: [
      {
        language: "English",
        level: "native",
      },
    ],
    topic: ["Travel", "Food"],
    avatar: "https://image2.gamme.com.tw/news2/2017/52/41/qZqZo6SVk6ecq6Y.jpg",
    online: true,
  },
  {
    provider: "native",
    username: "David",
    email: "david@example.com",
    password: "password123",
    age: "32",
    gender: "male",
    learning: [
      {
        language: "Japanese",
        level: "beginner",
      },
    ],
    speaking: [
      {
        language: "English",
        level: "native",
      },
    ],
    topic: ["Technology", "Science"],
    avatar: "https://image1.gamme.com.tw/news2/2017/52/41/qZqZo6SVk6ecq6Y.jpg",
    online: false,
  },
  {
    provider: "native",
    username: "Eve",
    email: "eve@example.com",
    password: "password123",
    age: "29",
    gender: "female",
    learning: [
      {
        language: "Chinese",
        level: "intermediate",
      },
    ],
    speaking: [
      {
        language: "English",
        level: "native",
      },
    ],
    topic: ["Fashion", "Beauty"],
    avatar: "https://image1.gamme.com.tw/news2/2017/52/41/qZqZo6SVk6ecq6Y.jpg",
    online: false,
  },
  {
    provider: "native",
    username: "Bella",
    email: "bella@example.com",
    password: "password123",
    age: "25",
    gender: "female",
    learning: [
      {
        language: "Japanese",
        level: "intermediate",
      },
      {
        language: "Spanish",
        level: "beginner",
      },
    ],
    speaking: [
      {
        language: "English",
        level: "native",
      },
      {
        language: "Mandarin",
        level: "advanced",
      },
    ],
    topic: ["Travel", "Food"],
    avatar: "https://image1.gamme.com.tw/news2/2017/52/41/qZqZo6SVk6ecq6Y.jpg",
    online: false,
  },
];

const createUsers = async (users) => {
  try {
    for (const user of users) {
      await User.create(user);
    }
  } catch (e) {
    console.log(e);
  }
};

createUsers(users);
