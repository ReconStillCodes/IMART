import React, { createContext, useState, useContext } from "react";

const SmartBotContext = createContext();

export const useSmartBot = () => {
  return useContext(SmartBotContext);
};

export const SmartBotProvider = ({ children }) => {
  const [chatSessions, setChatSessions] = useState([]);
  const [currChatSession, setCurrChatSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingChatSession, setLoadingChatSession] = useState(true);

  return (
    <SmartBotContext.Provider
      value={{
        chatSessions,
        setChatSessions,
        currChatSession,
        setCurrChatSession,
        user,
        setUser,
        loadingChatSession,
        setLoadingChatSession,
      }}
    >
      {children}
    </SmartBotContext.Provider>
  );
};
