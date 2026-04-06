import React, { useEffect } from 'react'
import './Splash.css'
import { useChatContext } from '../../context/ChatContext'
import { useNavigate } from 'react-router-dom';
import Home from '../Home/Home';
function Splash() {
  const { getUser, user } = useChatContext()
  const Navigate = useNavigate()
  useEffect(() => {
    const NavigatePage = async () => {
      const result = await getUser()
      if (result) {
        Navigate('/home')
      } else {
        Navigate('/auth')
      }
    }
    NavigatePage()
  }, [user])
  return (
    <div className='Splash'>
      <h1>Splash</h1>
    </div>
  )
}

export default Splash