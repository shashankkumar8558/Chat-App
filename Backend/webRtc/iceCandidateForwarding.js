import {getReceiverSocketId, io} from "../socket/socket.js"

io.on("connection",(socket) => {
  socket.on("ICE-Candidate",({candidate,receiverId,senderId}) => {
    console.log(`forwarding candidate from ${senderId} to ${receiverId}`);

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("ICE-Candidate",{candidate,senderId})
    }
    
  })
})