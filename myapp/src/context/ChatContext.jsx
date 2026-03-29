import React, { createContext, useContext, useState } from "react";

 const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

  const [user, setUser] = useState({});

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext=()=>{
    return useContext(ChatContext)
}