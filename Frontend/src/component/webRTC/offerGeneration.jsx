import { useSocketContext } from "../../context/SocketContext";

export const createOffer = async (socket) => {
  const peerConnection = new RTCPeerConnection();
  try {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit("offer", {offer});
    console.log("Offer Generated and sent : ", offer);

    return peerConnection;
  } catch (error) {
    console.error(
      "Bhai offer generate krne me ya local me copy banane me problem aaya hai",
      error
    );
    return null;
  }
};

export const receiveOffer = async (offer) => {
  const { socket } = useSocketContext();
  const peerConnection = new RTCPeerConnection();
  try {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    console.log("offer has been set as remote description :", offer);

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    socket.emit("answer", {answer});
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
