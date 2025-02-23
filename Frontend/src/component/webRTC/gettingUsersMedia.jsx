import React, { useEffect } from "react";

const GettingUsersMedia = () => {
  const peerConnection = new RTCPeerConnection();

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        addTracksToPeerConnection(stream);
        displayUserVideo(stream);
      } catch (error) {
        console.error(
          "There is an error while accessing the mediaDevices",
          error
        );
      }
    };

    getUserMedia();

    return () => {
      const videoElement = document.querySelector("video");
      if (videoElement) {
        videoElement.srcObject.getTracks().forEach((track) => track.stop());
        videoElement.remove();
      }
    };
  }, []);

  const displayUserVideo = (stream) => {
    const videoElement = document.createElement("video");
    const endButton = document.createElement("button");
    
    videoElement.srcObject = stream;
    videoElement.autoplay = true;
    videoElement.controls = true;

    // Video fullscreen styling
    videoElement.style.width = "100%";
    videoElement.style.height = "100%";
    videoElement.style.position = "absolute";
    videoElement.style.top = "0";
    videoElement.style.left = "0";

    // End Call Button styling
    endButton.innerText = "End Call";
    endButton.style.height = "50px";
    endButton.style.width = "100px";
    endButton.style.position = "absolute";
    endButton.style.bottom = "20px";
    endButton.style.left = "50%";
    endButton.style.transform = "translateX(-50%)";
    endButton.style.background = "red";
    endButton.style.color = "white";
    endButton.style.fontSize = "16px";
    endButton.style.border = "none";
    endButton.style.borderRadius = "8px";
    endButton.style.cursor = "pointer";

    // End Call button functionality
    endButton.onclick = () => {
        stream.getTracks().forEach(track => track.stop());  // Stop media tracks
        videoElement.remove();  // Remove video element
        endButton.remove();  // Remove button
        console.log("Call Ended");
    };

    document.body.appendChild(videoElement);
    document.body.appendChild(endButton); // 🔥 FIXED: Button now visible!
};


  const addTracksToPeerConnection = (stream) => {
    stream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, stream);
    });
  };

  return <div></div>;
};

export default GettingUsersMedia;