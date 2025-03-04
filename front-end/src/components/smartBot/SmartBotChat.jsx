import React, { useEffect, useState } from "react";

import SmartBotChatBox from "./SmartBotChatBox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { fetchChatSessionId } from "../utility/chatUtility/fetchChatBySessionId";
import { postChat } from "../utility/chatUtility/postChat";

import { useSmartBot } from "./SmartBotContext/SmartBotContext";

import "../Style/customScroll.css";

const SmartBotChat = () => {
  const { currChatSession } = useSmartBot();
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [sentMessage, setSentMessage] = useState(null);

  useEffect(() => {
    if (currChatSession) {
      fetchChatSessionId(currChatSession.id, setChats);
    }
  }, [currChatSession?.id, sentMessage?.id]);

  const handleMessage = () => {
    if (message.trim() !== "") {
      console.log(currChatSession.id);
      postChat(
        currChatSession.id,
        message,
        "Hello, this is a dummy Reply. Please understand that this is a test build. This is a dummy Reply",
        setSentMessage
      );
      setMessage("");
    }
  };

  return (
    <div
      className="container d-flex flex-column justify-content-between"
      style={{ width: "73%", minHeight: "80vh", minWidth: "500px" }}
    >
      <div
        className="w-100 h-100 d-flex flex-column align-items-center gap-5 custom-scrollbar"
        style={{ overflowY: "auto", maxHeight: "530px" }}
      >
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div className="container" style={{ width: "80%" }} key={chat.id}>
              <SmartBotChatBox chat={chat} />
            </div>
          ))
        ) : (
          <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center gap-3">
            <h1 className="fw-bold" style={{ color: "#384B70" }}>
              Start your talk with SmartBot
            </h1>
            <h3>What can I help with?</h3>
          </div> // Fallback content when `chats` is empty
        )}
      </div>
      <div
        className="w-100 d-flex justify-content-center align-items-center shadow rounded-pill px-3"
        style={{ height: "50px" }}
      >
        <input
          type="text"
          className="w-100 text-black h-100"
          style={{
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
          }}
          placeholder="Ask Anything"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleMessage()}
        />

        <button
          className="btn btn-primary rounded-pill d-flex align-items-center justify-content-center"
          style={{ width: "40px", height: "40px" }}
          disabled={!message.trim()}
          onClick={handleMessage}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default SmartBotChat;
