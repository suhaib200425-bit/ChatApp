import React from 'react'
import Home from './page/Home/Home'
import './App.css'
import AuthPage from './page/Auth/Auth'
import { Routes, Route } from "react-router-dom";
import Splash from './page/Splash/Splash';
import ChatBox from './components/ChatBox/ChatBox';
import ProfileEdit from './page/Edit/Edit';
import { ToastContainer } from "react-toastify";
import UserMedia from './components/UserMedia/UserMedia';

function App() {
  return (
    <div className='App'>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/chat/:userId" element={<ChatBox />} />
        <Route path="/home/media/:userId" element={<UserMedia />} />
        <Route path="/edit" element={<ProfileEdit />} />
      </Routes>
    </div>
  )
}

export default App