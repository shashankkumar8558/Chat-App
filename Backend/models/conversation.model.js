import mongoose from "mongoose";
import Message from "./message.model.js";

const conversationSchema = mongoose.Schema({
  participants: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  }],
  messages: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Message',
    default: []
  }]
}, { timestamps: true })

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;