import React, { createContext, useContext, useEffect, useState } from "react";
import { BACKENDURL } from "../assets/assets";
import axios from 'axios'

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

  const [user, setUser] = useState({});
  const [selectedUser, setSelectedUser] = useState({})

  useEffect(() => {
    async function apiWorking() {
      const response = await axios.get(BACKENDURL)
      alert(response.data)
      console.log(response.data);

    }
    apiWorking()
  }, [])
  return (
    <ChatContext.Provider value={{ user, setUser, setSelectedUser, selectedUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext)
}