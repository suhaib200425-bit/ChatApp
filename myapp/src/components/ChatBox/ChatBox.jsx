import React, { useRef, useState } from 'react'
import { FiImage, FiSend } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import './ChatBox.css'
import { useEffect } from 'react';
import { BACKENDURL, users } from '../../assets/assets';
import { useNavigate, useParams } from 'react-router-dom';
import { useChatContext } from '../../context/ChatContext';
import axios from 'axios';
function ChatBox() {
    const ScrollRef = useRef(null)
    const messageRef = useRef(null)
    const ImageRef = useRef(null)
    const [chatUser, setChatUser] = useState({})
    const [messageType, setMessageType] = useState('text')
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const { userId } = useParams()
    const { selectedUser, user } = useChatContext()

    const Navigate = useNavigate()
    const token = localStorage.getItem('token')
    useEffect(() => {

        const getProfile = async () => {
            const response = await axios.get(`${BACKENDURL}/api/user/profile/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.status) {
                setChatUser(response.data.user)
            }
        }
        const getMessage = async (id) => {
            if (id) {
                const response = await axios.get(`${BACKENDURL}/api/message/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log('MESSAGE');
                console.log(response.data);
                console.log('MESSAGE END');


                if (response.data.status) {
                    // setChatUser(response.data.user)
                    setMessages(response.data.messages)
                    messageRef.current.focus()
                }
            }
        }
        if (userId) {
            getProfile()
            getMessage(userId)
        }
        if (selectedUser != {}) {
            setChatUser(selectedUser)
            getMessage(selectedUser._id)
            console.log(ScrollRef.current.scrollTop);

        }

        return () => {
            setMessages([])
        }

    }, [selectedUser, userId])

    useEffect(() => {
        ScrollRef.current.scrollTop = ScrollRef.current.scrollHeight;
    }, [messages.length])

    const handleSend = async (file, type) => {
        // if (!message.trim()) return;

        console.log("Sent Message:", message);
        const formdata = new FormData()
        formdata.append("message", file ? file : message)
        formdata.append("messageType", type ? type : messageType)
        console.log(formdata);

        const data = file ? formdata : {
            message,
            messageType
        }

        const response = await axios.post(
            `${BACKENDURL}/api/message/sent/${chatUser._id}`,
            data, {
            headers: {
                Authorization: `Bearer ${token}`
            }

        }
        )
        if (response.data.status) {
            setMessage("");
            setMessages(prev => {
                return [...prev, response.data.data]
            })
        }
        console.log(response.data);

    };

    const handleImageChange = (e) => {
        setMessage(e.target.files[0]);
        setMessageType('image')
        handleSend(e.target.files[0], 'image')
    };

    return (
        <div className='ChatBox ms-2'>
            {
                chatUser && <div className="ChatUser" onClick={() => {
                    if (window.matchMedia("(max-width: 576px)").matches) {
                        Navigate(`/home/media/${chatUser._id}`)
                    }
                }}>
                    <div className="Profile-details">
                        <svg className='bachbtn' xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16"
                        onClick={(e)=>{
e.stopPropagation()
Navigate(-1)
                        }}>
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                        </svg>
                        <img src={
                            chatUser.profileImage != "" ?
                                chatUser.profileImage :
                                'https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg'
                        } alt="" srcset="" />
                        <h5><strong>{chatUser.userName}</strong></h5>
                    </div>
                    <div className="Icon">
                        {
                            user._id == chatUser._id &&
                            <FaEdit onClick={() => {
                                Navigate('/edit')
                            }} />
                        }
                    </div>
                </div>
            }
            <div className="MessageBox" ref={ScrollRef}>
                {messages && messages.map((msg, i) => (
                    <div
                        key={msg._id}
                        className={`m-1 message-row ${msg.senderId._id !== chatUser._id ? "sender-row" : "receiver-row"}`}
                    >
                        {
                            // messages[messages.length==i+1?i:i+1].senderId._id!=chatUser._id &&
                            msg.senderId._id === chatUser._id && (
                                <img src={
                                    msg.senderId.profileImage != "" ?
                                        msg.senderId.profileImage :
                                        'https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg'
                                } alt={msg.userName} className="chat-avatar" />
                            )}

                        <div>
                            <div className={`message-bubble ${msg.senderId._id !== chatUser._id ?
                                'sender' :
                                'receiver'}`}>
                                {
                                    msg.messageType == 'text' ?
                                        <p className='p-3 '>{msg.message}</p> :
                                        <img src={msg.message} alt="" srcset="" />
                                }
                            </div>

                            {/* <span style={{color:'wheat',fontSize:'13px' }} className='text-end'>{msg.time}</span> */}

                        </div>
                        {

                            // messages[messages.length==i+1?i:i+1].senderId._id===chatUser._id &&
                            msg.senderId._id !== chatUser._id && (

                                <img src={
                                    msg.senderId.profileImage != "" ?
                                        msg.senderId.profileImage :
                                        'https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg'
                                } alt={msg.userName} className="chat-avatar" />
                            )}
                    </div>
                ))}
            </div>
            <div className="chat-input-wrapper">
                <div className="chat-input-box">
                    <input
                        ref={messageRef}
                        type="text"
                        placeholder="Send a message"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value)
                            setMessageType('text')
                        }}
                    />

                    <button className="image-btn">
                        <input ref={ImageRef} type="file" accept="image/*" hidden onChange={handleImageChange}></input>
                        <FiImage onClick={() => {
                            ImageRef.current.click()
                        }} />
                    </button>
                </div>

                <button className="send-btn" onClick={() => handleSend(

                )}>
                    <FiSend />
                </button>
            </div>

        </div>
    )

}

export default ChatBox