import React, { createContext, useContext, useEffect, useState } from "react";
import { BACKENDURL } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

  const [user, setUser] = useState({});
  const [selectedUser, setSelectedUser] = useState({})
  async function getUser() {
    const token = localStorage.getItem('token')
    console.log(token);

    const response = await axios.get(`${BACKENDURL}/api/user/check-loged`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log(response.data);

    if (response.data.status) {
      setUser(response.data.user)
      return true
    } else {
      toast.error(response.data.message)
      return false
    }
  }
  useEffect(() => {
    getUser()
    async function apiWorking() {
      const response = await axios.get(BACKENDURL)
      alert(response.data)
      console.log(response.data);

    }
    apiWorking()
  }, [])
  return (
    <ChatContext.Provider value={{ user, setUser, setSelectedUser, selectedUser,getUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext)
}