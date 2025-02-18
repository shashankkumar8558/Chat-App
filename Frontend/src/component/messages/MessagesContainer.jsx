import { useEffect, useRef, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import GettingUsersMedia from "../webRTC/gettingUsersMedia"
import { IoVideocam } from "react-icons/io5";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { createOffer } from "../webRTC/offerGeneration";
import { useSocketContext } from "../../context/SocketContext";

const MessagesContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const {socket} = useSocketContext();
  const peerConnectionRef = useRef();
  const [incomingOffer,setIncomingOffer] = useState(null);

  useEffect(() => {
    // cleanup Function (Unmount)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  useEffect(() => {
    // 📌 Jab Peer 2 Ko Offer Milega, Toh Store Karo
    socket?.on("offer", async (offer) => {
      console.log("Offer received:", offer);
      setIncomingOffer(offer); // Popup Show Hoga
    });

    socket?.on("ice-candidate", (candidate) => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current
          .addIceCandidate(new RTCIceCandidate(candidate))
          .then(() => console.log("ICE Candidate Added"))
          .catch((error) =>
            console.error("Error adding received ICE Candidate", error)
          );
      }
    });

    return () => {
      socket?.off("offer");
      socket?.off("ice-candidate");
    };
  }, [socket]);

  const handleCall = async () => {
    const peerConnection = await createOffer(socket);
    peerConnectionRef.current = peerConnection;

    if (peerConnection) {
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('ICE-Candidate',event.candidate);
          console.log("ICE CANDIDATE SENT : ",event.candidate);
        }
      }
    }
  };

  const acceptCall = async () => {
    if (!incomingOffer) return 

    const peerConnection = await receiveOffer(incomingOffer)
    peerConnectionRef.current = peerConnection;

    setIncomingOffer(null);

    peerConnection.onicecandidate = (event) => {
      socket.emit('ICE-Candidate',event.candidate);
      console.log("Bhai call receive krne ke baad ka ICE CANDIDATE hai yeh : ",event.candidate);
    }
  }

  const rejectCall = () => {
    setIncomingOffer(null);
    console.log("Call Rejected");
  };

  return (
    <div className="md:min-w-[450px] flex flex-col overflow-auto" style={{border: "1px solid red"}}>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div
            className="bg-slate-500 px-4 py-2 mb-2"
            style={{ display: "flex", justifyContent: "space-between",border: "1px solid red" }}
          >
            <span className="text-gray-900 font-bold">
              {selectedConversation.username}
            </span>
            <div style={{display:"flex",alignItems:"center"}}>
              <IoVideocam onClick={handleCall} style={{fontSize:"x-large"}}/>
            </div>
          </div>
          <div>
      {/* 🔔 Incoming Call Pop-up */}
      {incomingOffer && (
        <div style={{
          position: "fixed", top: "20px", right: "20px", padding: "10px", background: "white",
          border: "1px solid black", borderRadius: "8px"
        }}>
          <p>📞 Incoming Call</p>
          <button onClick={acceptCall} style={{ marginRight: "10px" }}>✅ Accept</button>
          <button onClick={rejectCall}>❌ Reject</button>
        </div>
      )}
    </div>
          <Messages />
          <MessageInput />
          <GettingUsersMedia />
        </>
      )}
    </div>
  );
};

export default MessagesContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome {authUser.fullname} </p>
        <p>Select a Chat To Start Messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
