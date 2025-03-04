import React, { useEffect, useState } from "react";

import NavBar from "./NavBar/NavBar";
import SmartBotNav from "./smartBot/smartBotNav";
import SmartBotChat from "./smartBot/SmartBotChat";

import { useSmartBot } from "./smartBot/SmartBotContext/SmartBotContext";

import { fetchUserBySession } from "./utility/userUtility/fetchUserBySession";
import { postChatSession } from "./utility/chatSessionUtility/postChatSession";

const SmartBotPage = () => {
  const {
    chatSessions,
    currChatSession,
    setCurrChatSession,
    user,
    setUser,
    loadingChatSession,
  } = useSmartBot();

  useEffect(() => {
    fetchUserBySession("IMART_SESSION", setUser);
  }, []);

  useEffect(() => {
    if (loadingChatSession) {
      return;
    }

    console.log("True loading chat sessions");
    if (currChatSession == null) {
      if (chatSessions.length === 0) {
        postChatSession(user.id, "New Chat", setCurrChatSession);
        console.log("No chat Session");
      } else {
        setCurrChatSession(chatSessions[0]);
        console.log("Exist chat session");
      }
    }
  }, [loadingChatSession]);

  useEffect(() => {
    if (currChatSession) {
      console.log(currChatSession);
    } else {
      console.log("no");
    }
  }, [currChatSession?.id]);

  return (
    <div
      className=""
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "white",
      }}
    >
      <NavBar activePage="smartbot" />

      <div
        className="container d-flex flex-row justify-content-between gap-4"
        style={{ paddingTop: "80px" }}
      >
        <SmartBotNav />
        <SmartBotChat />
      </div>
    </div>
  );
};

export default SmartBotPage;
