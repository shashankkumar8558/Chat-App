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
    videoElement.srcObject = stream;
    videoElement.autoplay = true;
    videoElement.controls = true;

    // Set fullscreen or desired size
    videoElement.style.width = "100%";
    videoElement.style.height = "100%";
    videoElement.style.position = "absolute";
    videoElement.style.top = "0";
    videoElement.style.left = "0";

    document.body.appendChild(videoElement);
  };

  const addTracksToPeerConnection = (stream) => {
    stream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, stream);
    });
  };

  return <div></div>;
};

export default GettingUsersMedia;