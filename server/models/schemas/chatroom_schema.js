import { mongoose, Schema } from "mongoose";

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
  lastMessage: {
    content: {
      type: {
        type: String,
        enum: ["text", "image"],
      },
      data: {
        type: String,
      },
    },
    time: {
      type: Date,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chatroom = mongoose.model("Chatroom", chatroomSchema);
export default Chatroom;
