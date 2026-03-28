import React from 'react'
import './UsersList.css'
import { useNavigate } from 'react-router-dom';
import { users } from '../../assets/assets';

function UsersList({ setClickedUser, selectedUser, setSelectedUser }) {
    const Navigate = useNavigate()
    
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="logo-icon">💬</div>
                <h2>QuickChat</h2>
            </div>

            <div className="search-box">
                <input type="text" placeholder="Search here..." />
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
                                setSelectedUser(user)
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
                            <img src={user.avatar} alt={user.name} className="avatar" />
                            <div className="user-info">
                                <h4>{user.name}</h4>
                                <p className={user.status === "Online" ? "online" : "offline"}>
                                    {user.status}
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