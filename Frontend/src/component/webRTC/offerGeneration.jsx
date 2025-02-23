export const createOffer = async (socket, receiverId, senderId) => {
  const peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
  });

  // Pehle Media Stream Lo
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));  // 🔥 Tracks Add Karna Zaroori Hai
    console.log("🎥 Media Stream Tracks Added!");
  } catch (err) {
    console.error("🚨 Media access error:", err);
    return null;
  }

  // ICE Gathering State Debugging
  peerConnection.onicegatheringstatechange = () => {
    console.log("📡 ICE Gathering State:", peerConnection.iceGatheringState);
  };

  peerConnection.onicecandidate = (event) => {
    console.log("🔍 ICE Candidate:", event.candidate); // Check if candidates are generated
  };

  try {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit("offer", { offer, receiverId, senderId });
    console.log("🚀 Offer Generated and Sent:", offer, receiverId, senderId);

    return peerConnection;
  } catch (error) {
    console.error("❌ Offer Generation Error:", error);
    return null;
  }
};


export const receiveOffer = async (socket,offer,receiverId,senderId) => {
  const peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
  });

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));  // 🔥 Tracks Add Karna Zaroori Hai
    console.log("🎥 Media Stream Tracks Added!");
  } catch (err) {
    console.error("🚨 Media access error:", err);
    return null;
  }

  // ICE Gathering State Debugging
  peerConnection.onicegatheringstatechange = () => {
    console.log("📡 ICE Gathering State:", peerConnection.iceGatheringState);
  };

  peerConnection.onicecandidate = (event) => {
    console.log("🔍 ICE Candidate:", event.candidate); // Check if candidates are generated
  };
  
  try {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    console.log("offer has been set as remote description :", offer);

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    socket.emit("answer", {answer,receiverId,senderId});
    console.log(
      "Bhai answer bhi generate hogaya hai saamne waale peer ka : ",
      answer
    );

    return peerConnection;
  } catch (error) {
    console.error("bhai answer generate krne me error aaya hai : ", error);
    return null;
  }
};
