import React from 'react'
import Home from './page/Home/Home'
import './App.css'
import AuthPage from './page/Auth/Auth'
import { Routes, Route } from "react-router-dom";
import Splash from './page/Splash/Splash';
import ChatBox from './components/ChatBox/ChatBox';
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/chat/:userId" element={<ChatBox />} />
      </Routes>
    </div>
  )
}

export default App