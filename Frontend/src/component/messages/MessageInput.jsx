import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage, loading } = useSendMessage();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    console.log("Message Before sending :", message);
    await sendMessage(message);
    console.log("Message After sending :", message);
    setMessage("");
  };

  return (
    <form className="px-4 my-3" onSubmit={HandleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
          disabled={loading}
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;

//Starter Message For MessageInput
/* import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  return (
    <form className="px-4 my-3">
      <div className="w-full">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a Message"
        />
      </div>
      <button
        type="submit"
        className="absolute inset-y-0 end-0 flex items-center pe-3"
      >
        <BsSend />
      </button>
    </form>
  );
};

export default MessageInput; */
