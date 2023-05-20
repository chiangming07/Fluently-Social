import { mongoose, Schema } from "mongoose";

const messageSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
