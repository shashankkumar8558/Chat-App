import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, recieverId]
      }
    })

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      })
    }

    const newMessage = new Message({
      senderId: senderId,
      recieverId: recieverId,
      messages: message,
    })

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    //SOCKET IO functionalities will go here ...



    //await conversation.save();
    //await newMessage.save();
    await Promise.all(conversation.save(), newMessage.save());//This Will Run In Parallel.

    res.status(201).json({ message: "Message Sent Successfully" });

  } catch (error) {
    console.log("Error in sendMessage Controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" })
  }
};


export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");//Not Refrence But Actual Message

    if (!conversation) {
      return res.status(200).json([]);
    }

    const message = conversation.messages;

    res.status(200).json(message);

  } catch (error) {
    console.log("Error in getMessage Controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" })
  }
}