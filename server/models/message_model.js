import { mongoose, Schema } from "mongoose";
import { db } from "../database.js";

const messageSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
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
    type: Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Message = mongoose.model("Message", messageSchema);
