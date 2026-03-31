import React, { useState } from 'react'
import './UsersList.css'
import { useNavigate } from 'react-router-dom';
import { BACKENDURL, users } from '../../assets/assets';
import axios from 'axios';
import { useChatContext } from '../../context/ChatContext';
import { useEffect } from 'react';

function UsersList({ setClickedUser, selectedUser }) {
    const Navigate = useNavigate()
    const [users, setUsers] = useState([])
    const { setSelectedUser } = useChatContext()
    const token = localStorage.getItem('token')
    useEffect(() => {
        async function getmessageUser() {
            const response = await axios.get(
                `${BACKENDURL}/api/message/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                        }
                }
            )
            console.log(response.data);
            if(response.data.status){
                setUsers(response.data.users)
            }
        }
        getmessageUser()
    }, [])


    async function searchUser(e) {
        const value = e.target.value
        if (value) {

            console.log(value)
            const token = localStorage.getItem('token')
            const response = await axios.get(`${BACKENDURL}/api/user/search-user?query=${value}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data);
            if (response.data.status) {
                setUsers(response.data.users)
            }
        }
    }

    const GetUser = async (id) => {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${BACKENDURL}/api/user/profile/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data);

        if (response.data.status) {
            setSelectedUser(response.data.user)
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="logo-icon">💬</div>
                <h2>QuickChat</h2>
            </div>

            <div className="search-box">
                <input onChange={searchUser} type="text" placeholder="Search here..." />
            </div>

            <div className="user-list">
                {users.map((user) => (
                    <div
                        onClick={() => {

                            if (selectedUser._id == user._id) {
                                setClickedUser(false)
                                console.log('Remove');
                                setSelectedUser({})

                            } else {
                                GetUser(user._id)
                                console.log(user);
                                setClickedUser(true)
                            }
                            if (window.matchMedia("(max-width: 576px)").matches) {
                                Navigate(`/home/chat/${user._id}`)
                            }

                        }}
                        key={user._id}
                        className={`user-item ${(selectedUser != {} && selectedUser._id == user._id) ? "active-user" : ""}`}
                    >
                        <div className="user-left">
                            <img src={user.profileImage != '' ? user.profileImage : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg'} alt={user.userName} className="avatar" />
                            <div className="user-info">
                                <h4>
                                    <font size='3' face="Arial" >
                                        {user.userName}
                                    </font>
                                </h4>
                                <p className={user.status === "Online" ? "online" : "offline"}>
                                    {user.lastMessage}
                                </p>
                            </div>
                        </div>

                        {user.unread > 0 && <span className="badge">{user.unread}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UsersList