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
        language: "zh-TW",
        level: "beginner",
      },
    ],
    speaking: [
      {
        language: "en-US",
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
        language: "ES",
        level: "beginner",
      },
    ],
    speaking: [
      {
        language: "en-US",
        level: "native",
      },
    ],
    topic: ["Sports", "Music"],
    avatar: "https://i.pravatar.cc/300",
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
        language: "JP",
        level: "intermediate",
      },
    ],
    speaking: [
      {
        language: "en-US",
        level: "native",
      },
    ],
    topic: ["Travel", "Food"],
    avatar: "https://i.pravatar.cc/300",
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
        language: "JP",
        level: "advanced",
      },
    ],
    speaking: [
      {
        language: "ES",
        level: "native",
      },
    ],
    topic: ["History", "Art"],
    avatar: "https://i.pravatar.cc/300",
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
        language: "ES",
        level: "intermediate",
      },
    ],
    speaking: [
      {
        language: "JP",
        level: "native",
      },
    ],
    topic: ["Travel", "Food"],
    avatar: "https://i.pravatar.cc/300",
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
        language: "en-US",
        level: "beginner",
      },
    ],
    speaking: [
      {
        language: "zh-TW",
        level: "native",
      },
    ],
    topic: ["Technology", "Science"],
    avatar: "https://i.pravatar.cc/300",
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
        language: "zh-TW",
        level: "intermediate",
      },
    ],
    speaking: [
      {
        language: "JP",
        level: "native",
      },
    ],
    topic: ["Fashion", "Beauty"],
    avatar: "https://i.pravatar.cc/300",
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
        language: "JP",
        level: "intermediate",
      },
      {
        language: "Spanish",
        level: "beginner",
      },
    ],
    speaking: [
      {
        language: "ES",
        level: "native",
      },
      {
        language: "zh-TW",
        level: "advanced",
      },
    ],
    topic: ["Travel", "Food"],
    avatar: "https://i.pravatar.cc/300",
    online: false,
  },
  {
    provider: "native",
    username: "Moka",
    email: "moka@example.com",
    password: "password123",
    age: "30",
    gender: "female",
    learning: [
      { language: "en-US", level: "advanced" },
      { language: "zh-TW", level: "intermediate" },
    ],
    speaking: [
      {
        language: "ES",
        level: "intermediate",
      },
    ],
    topic: ["Music", "Movies"],
    avatar: "https://i.pravatar.cc/300",
    online: false,
  },
  {
    provider: "native",
    username: "Baby",
    email: "baby@example.com",
    password: "password123",
    age: "28",
    gender: "male",
    learning: [
      {
        language: "ES",
        level: "advanced",
      },
      {
        language: "zh-TW",
        level: "intermediate",
      },
    ],
    speaking: [
      {
        language: "JP",
        level: "intermediate",
      },
      {
        language: "en-US",
        level: "advanced",
      },
    ],
    topic: ["Sports", "Books"],
    avatar: "https://i.pravatar.cc/300",
    online: false,
  },
  {
    provider: "native",
    username: "Charlie",
    email: "charlie@example.com",
    password: "password123",
    age: "27",
    gender: "male",
    learning: [
      {
        language: "ES",
        level: "intermediate",
      },
    ],
    speaking: [
      {
        language: "zh-TW",
        level: "advanced",
      },
      {
        language: "en-US",
        level: "native",
      },
    ],
    topic: ["Technology", "Fashion"],
    avatar: "https://i.pravatar.cc/300",
    online: false,
  },
  {
    provider: "native",
    username: "Dave",
    email: "dave@example.com",
    password: "password123",
    age: "29",
    gender: "male",
    learning: [
      {
        language: "zh-TW",
        level: "beginner",
      },
      {
        language: "JP",
        level: "intermediate",
      },
    ],
    speaking: [
      {
        language: "ES",
        level: "intermediate",
      },
      {
        language: "en-US",
        level: "native",
      },
    ],
    topic: ["Art", "Design"],
    avatar: "https://i.pravatar.cc/300",
    online: false,
  },
  {
    provider: "native",
    username: "Shunsuke",
    email: "shunsuke@example.com",
    password: "password123",
    age: "30",
    gender: "male",
    learning: [
      {
        language: "en-US",
        level: "intermediate",
      },
      {
        language: "zh-TW",
        level: "beginner",
      },
    ],
    speaking: [
      {
        language: "JP",
        level: "native",
      },
      {
        language: "ES",
        level: "advanced",
      },
    ],
    topic: ["Sports", "Music"],
    avatar: "https://i.pravatar.cc/300",
    online: false,
  },
  {
    provider: "native",
    username: "Ayaka",
    email: "ayaka@example.com",
    password: "password123",
    age: "28",
    gender: "female",
    learning: [
      {
        language: "ES",
        level: "advanced",
      },
      {
        language: "JP",
        level: "beginner",
      },
    ],
    speaking: [
      {
        language: "zh-TW",
        level: "native",
      },
      {
        language: "en-US",
        level: "intermediate",
      },
    ],
    topic: ["Travel", "Food"],
    avatar: "https://i.pravatar.cc/300",
    online: false,
  },
  {
    provider: "native",
    username: "Haruto",
    email: "haruto@example.com",
    password: "password123",
    age: "32",
    gender: "male",
    learning: [
      {
        language: "zh-TW",
        level: "intermediate",
      },
      {
        language: "ES",
        level: "beginner",
      },
    ],
    speaking: [
      {
        language: "en-US",
        level: "native",
      },
      {
        language: "JP",
        level: "advanced",
      },
    ],
    topic: ["Sports", "Movies"],
    avatar: "https://i.pravatar.cc/300",
    online: false,
  },
  {
    provider: "native",
    username: "Sakura",
    email: "sakura@example.com",
    password: "password123",
    age: "27",
    gender: "female",
    learning: [
      {
        language: "JP",
        level: "advanced",
      },
      {
        language: "ES",
        level: "beginner",
      },
    ],
    speaking: [
      {
        language: "en-US",
        level: "intermediate",
      },
      {
        language: "zh-TW",
        level: "native",
      },
    ],
    topic: ["Travel", "Art"],
    avatar: "https://i.pravatar.cc/300",
    online: false,
  },
];

const createUsers = async (users) => {
  try {
    for (const user of users) {
      await User.create(user);
    }
    console.log("Users created successfully!");
  } catch (e) {
    console.log(e);
  }
};

createUsers(users);
