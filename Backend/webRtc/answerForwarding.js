import {getReceiverSocketId, io} from "../socket/socket.js"

io.on("connection",(socket) => {
  socket.on("answer",({answer,receiverId,senderId}) => {
    console.log("forwarding answer from senderId to receiverId");

    const senderSocketId = getReceiverSocketId(senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("answer",({answer,receiverId}))
    }
  })
})