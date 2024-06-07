import mongoose from "mongoose";
import User from "./user.model.js";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recieverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  //createdAt, //updatedAt
}, { timestamps: true })

const Message = mongoose.model("Message", messageSchema);

export default Message;