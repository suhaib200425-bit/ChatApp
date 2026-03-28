import React, { useEffect, useState } from "react";
import "./UserMedia.css";
import { users } from "../../assets/assets";
import { useParams } from "react-router-dom";

const mediaImages = [
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=60"
];

const UserMedia = ({ selectedUser }) => {

  const [mediaUser, setMediaUser] = useState({})
  const { userId } = useParams()
  useEffect(() => {
          console.log('userId'+userId);
    const user = users.filter(user => user._id == userId)
    console.log(user);
    
    if (userId) {
      setMediaUser(user)
    } else {
      setMediaUser(selectedUser)
    }

  }, [selectedUser, userId])
  return (
    <div className="right-panel">
      <div className="profile-section">
        <img
          src={mediaUser && mediaUser.avatar}
          alt={mediaUser && mediaUser.name}
          className="profile-image"
        />

        <div className="profile-name-row">
          <span className="online-dot"></span>
          <h3>{mediaUser && mediaUser.name}</h3>
        </div>

        <p className="profile-desc">
          Lorem ipsum is placeholder text commonly used in...
        </p>
      </div>

      <div className="media-section">
        <h4>Media</h4>

        <div className="media-grid">
          {mediaImages.map((img, index) => (
            <img key={index} src={img} alt={`media-${index}`} className="media-img" />
          ))}
        </div>
      </div>

      <button className="logout-btn">Logout</button>
    </div>
  );
};

export default UserMedia;