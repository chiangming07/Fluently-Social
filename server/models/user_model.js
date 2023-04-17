import { mongoose, Schema } from "mongoose";
import { db } from "../../database.js";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  learning: [
    {
      language: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced", "native"],
        required: true,
      },
    },
  ],
  speaking: [
    {
      language: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced", "native"],
        required: true,
      },
    },
  ],
  topic: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  avatar: { type: String },
  online: { type: Boolean, required: true },
  chatroom: [
    {
      roomId: {
        type: String,
        ref: "Chatroom",
      },
      lastRead: {
        type: Date,
      },
    },
  ],
});

export const User = mongoose.model("User", userSchema);
