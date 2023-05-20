import { mongoose, Schema } from "mongoose";

const userSchema = new Schema({
  provider: {
    type: String,
    required: true,
  },
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
  speaking: [
    {
      language: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        enum: ["advanced", "native"],
        required: true,
      },
    },
  ],
  learning: [
    {
      language: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        required: true,
      },
    },
  ],
  topic: [{ type: String }],
  avatar: { type: String },
  online: { type: Boolean, default: true },
  chatroom: [
    {
      roomId: {
        type: String,
      },
      lastRead: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  loginAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
