import { mongoose, Schema } from "mongoose";
import { db } from "../database.js";

const chatroomSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      required: true,
    },
  ],
  lastMessageRead: {
    type: Map,
    of: Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Chatroom = mongoose.model("Chatroom", chatroomSchema);
