import {getReceiverSocketId, io} from "../socket/socket.js"

io.on("connection",(socket) => {
  socket.on("offer",({offer,receiverId,senderId}) => {
    console.log("Forwarding offer from senderId to receiverId");

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverId).emit("offer",{senderId,offer});
    }
    
  })
})