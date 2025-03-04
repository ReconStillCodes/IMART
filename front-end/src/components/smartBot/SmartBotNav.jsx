import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faComment } from "@fortawesome/free-solid-svg-icons";

import { fetchChatSessionByUserId } from "../utility/chatSessionUtility/fetchChatSessionByUserId";
import { postChatSession } from "../utility/chatSessionUtility/postChatSession";

import { useSmartBot } from "./SmartBotContext/SmartBotContext";

import "../Style/customScroll.css";

const SmartBotNav = () => {
  const {
    chatSessions,
    setChatSessions,
    user,
    setLoadingChatSession,
    currChatSession,
    setCurrChatSession,
  } = useSmartBot();

  const [hoveredSession, setHoveredSession] = useState(null);

  useEffect(() => {
    if (user != null) {
      fetchChatSessionByUserId(user.id, setChatSessions, setLoadingChatSession);
    }
  }, [user, currChatSession?.id]);

  const hoverEffect = (e) => {
    e.target.style.background = "rgba(255, 255, 255, 0.1)";
  };

  const removeEffect = (e) => {
    e.target.style.background = "transparent"; // Reset background on mouse up
  };

  const handleChangeSession = (chatSession) => {
    setCurrChatSession(chatSession);
  };

  const handleNewChat = () => {
    postChatSession(user.id, "New Chat", setCurrChatSession);
  };

  const truncateTitle = (title, maxLength = 20) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + "..."
      : title;
  };

  return (
    <div
      className="rounded d-flex flex-column align-items-center py-3 px-4 text-white"
      style={{
        width: "25%",
        minWidth: "320px",
        height: "80vh",
        backgroundColor: "#384B70",
      }}
    >
      <h4 className="mb-3">SmartBot</h4>

      <button
        className=" w-100 rounded d-flex align-items-center justify-content-left gap-2 mb-4"
        style={{ border: "none", backgroundColor: "transparent" }}
        onMouseEnter={hoverEffect}
        onMouseLeave={removeEffect}
        onClick={handleNewChat}
      >
        <FontAwesomeIcon
          icon={faPlus}
          className="p-1  bg-white rounded-pill"
          style={{ color: "#384B70", width: "15px", height: "15px" }}
        />
        New Chat{" "}
      </button>

      <div
        className="d-flex flex-column w-100 gap-1 custom-scrollbar"
        style={{ minHeight: "400px", maxHeight: "400px", overflowY: "auto" }}
      >
        {chatSessions.map((chatSession) => {
          const isActive = chatSession.id === currChatSession?.id;
          const isHovered = chatSession.id === hoveredSession;
          return (
            <button
              key={chatSession.id}
              className=" w-100 rounded d-flex align-items-center justify-content-left gap-2"
              style={{
                border: "none",
                backgroundColor: isActive
                  ? "rgba(255, 255, 255, 0.1)"
                  : isHovered
                  ? "rgba(255, 255, 255, 0.1)"
                  : "transparent",
              }}
              onMouseEnter={() => setHoveredSession(chatSession.id)}
              onMouseLeave={() => setHoveredSession(null)}
              onClick={() => handleChangeSession(chatSession)}
            >
              <FontAwesomeIcon
                icon={faComment}
                className="text-white"
                style={{ color: "#384B70" }}
              />
              {truncateTitle(chatSession.title, 20)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SmartBotNav;
