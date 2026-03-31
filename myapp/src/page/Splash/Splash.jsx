import React, { useEffect } from 'react'
import './Splash.css'
import { useChatContext } from '../../context/ChatContext'
import { BACKENDURL } from '../../assets/assets'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
function Splash() {
  const { user, setUser } = useChatContext()
  const Navigate = useNavigate()
  useEffect(() => {
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
        Navigate('/home')
      } else {
        toast.error(response.data.message)
        Navigate('/auth')
      }
    }
    getUser()
  }, [])
  return (
    <div className='Splash'>
      <h1>Splash</h1>
    </div>
  )
}

export default Splash