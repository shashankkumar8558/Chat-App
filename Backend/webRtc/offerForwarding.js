import {getReceiverSocketId, io} from "../socket/socket.js"

io.on("connection",(socket) => {
  console.log("New connection established :",socket.id);
  
  socket.on("offer",({offer,receiverId,senderId}) => {
    console.log("Forwarding offer from senderId to receiverId");

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("offer",{senderId,offer});
    }
  })
})