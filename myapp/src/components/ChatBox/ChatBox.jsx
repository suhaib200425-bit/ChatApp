import React, { useState } from 'react'
import { FiImage, FiSend } from "react-icons/fi";
import './ChatBox.css'
import { useEffect } from 'react';
import { users } from '../../assets/assets';
import { useParams } from 'react-router-dom';
function ChatBox({ selectedUser }) {
    const [chatUser, setChatUser] = useState({})
    const { userId } = useParams()
    useEffect(() => {
        console.log('userId'+userId);
        
        const user = users.filter(user => user._id == userId)
    console.log(user);
        if (userId) {
            setChatUser(user[0])
        } else {
            setChatUser(selectedUser)
        }

    }, [selectedUser,userId])

    const messages = [
        {
            id: 1,
            sender: "receiver",
            text: "Htoday?",
            time: "2:35 PM",
            avatar: "https://i.pravatar.cc/150?img=32",
            name: "Caroline Gray",
        },
        {
            id: 2,
            sender: "sender",
            text: "I’m doing gre.",
            time: "2:36 PM",
            avatar: "https://i.pravatar.cc/150?img=12",
            name: "You",
        },
        {
            id: 3,
            sender: "receiver",
            text: "Nice! That design looks really modern and clean.",
            time: "2:38 PM",
            avatar: "https://i.pravatar.cc/150?img=32",
            name: "Caroline Gray",
        },
        {
            id: 4,
            sender: "sender",
            text: "Yes! I’m trying to make it exactly like the image using React components.",
            time: "2:40 PM",
            avatar: "https://i.pravatar.cc/150?img=12",
            name: "You",
        },
        {
            id: 5,
            sender: "receiver",
            text: "Awesome. Don’t forget the sidebar search and user list section.",
            time: "2:42 PM",
            avatar: "https://i.pravatar.cc/150?img=32",
            name: "Caroline Gray",
        },
        {
            id: 6,
            sender: "sender",
            text: "Already done 😄 Next I’m building the center chat area.",
            time: "2:45 PM",
            avatar: "https://i.pravatar.cc/150?img=12",
            name: "You",
        },
        {
            id: 7,
            sender: "receiver",
            text: "Perfect! Also add the right-side profile card and media section.",
            time: "2:47 PM",
            avatar: "https://i.pravatar.cc/150?img=32",
            name: "Caroline Gray",
        },
        {
            id: 8,
            sender: "sender",
            text: "Sure 🔥 I’ll make the full layout responsive too.",
            time: "2:49 PM",
            avatar: "https://i.pravatar.cc/150?img=12",
            name: "You",
        },
        {
            id: 9,
            sender: "receiver",
            text: "That’s awesome. Send me the final code once it’s ready.",
            time: "2:51 PM",
            avatar: "https://i.pravatar.cc/150?img=32",
            name: "Caroline Gray",
        },
        {
            id: 10,
            sender: "sender",
            text: "Done deal 😎 I’ll send the complete React components next.",
            time: "2:53 PM",
            avatar: "https://i.pravatar.cc/150?img=12",
            name: "You",
        },
    ];

    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (!message.trim()) return;

        console.log("Sent Message:", message);
        setMessage("");
    };

    return (
        <div className='ChatBox ms-2'>
            {
                chatUser && <div className="ChatUser">
                    <div className="Profile-details">
                        <img src={chatUser.avatar} alt="" srcset="" />
                        <h5><strong>{chatUser.name}</strong></h5>
                    </div>
                    <div className="Icon">

                    </div>
                </div>
            }
            <div className="MessageBox">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`message-row ${msg.sender === "sender" ? "sender-row" : "receiver-row"}`}
                    >
                        {msg.sender === "receiver" && (
                            <img src={msg.avatar} alt={msg.name} className="chat-avatar" />
                        )}

                        <div>
                            <div className={`message-bubble ${msg.sender}`}>
                                <p>{msg.text}</p>
                            </div>

                            {/* <span style={{color:'wheat',fontSize:'13px' }} className='text-end'>{msg.time}</span> */}

                        </div>
                        {msg.sender === "sender" && (
                            <img src={msg.avatar} alt={msg.name} className="chat-avatar" />
                        )}
                    </div>
                ))}
            </div>
            <div className="chat-input-wrapper">
                <div className="chat-input-box">
                    <input
                        type="text"
                        placeholder="Send a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <button className="image-btn">
                        <FiImage />
                    </button>
                </div>

                <button className="send-btn" onClick={handleSend}>
                    <FiSend />
                </button>
            </div>

        </div>
    )
}

export default ChatBox