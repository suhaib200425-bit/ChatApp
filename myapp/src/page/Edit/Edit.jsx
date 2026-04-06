import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./Edit.css";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../../context/ChatContext";
import { BACKENDURL } from "../../assets/assets";
import axios from "axios";

function ProfileEdit() {
    const [userName, setUserName] = useState("");
    const [bio, setBio] = useState("");
    const Navigate = useNavigate()
    const { user,setUser } = useChatContext()
    const [image, setImage] = useState(null);
    const [imagefile, setImageFile] = useState({});
    const profileRef = useRef()
    const token = localStorage.getItem('token')
    useEffect(() => {
        setBio(user.bio)
        setUserName(user.userName)
        setImage(user.profileImage)
    }, [user])

    const handleImage = (e) => {
        setImageFile(e.target.files[0])
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userName, bio, imagefile);
        const formData = new FormData();

        formData.append("username", userName);
        formData.append("bio", bio);
        if (imagefile) {
            formData.append('profileImage', imagefile)
        }
        if (userName.trim()) {
            const response = await axios.patch(`${BACKENDURL}/api/user/updated`,
                formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data);
            if(response.data.status){
setUser(response.data.user)
            }

        }
    };

    return (
        <div className="container">
            <div className="card">

                <div className="form-section">
                    <h2>Profile details</h2>

                    <div className="upload">
                        <input type="file" ref={profileRef} onChange={handleImage} hidden />
                    </div>

                    <input
                        type="text"
                        placeholder="John Johnson"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />

                    <textarea
                        placeholder="Hi Everyone, I am using QuickChat"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    ></textarea>

                    <button onClick={handleSubmit}>Save</button>
                </div>

                <div className="image-section">
                    {image ? (
                        <img src={image} alt="profile" onClick={() => {
                            profileRef.current.click()
                        }} />
                    ) : (
                        <div className="placeholder" onClick={() => {
                            profileRef.current.click()
                        }}></div>
                    )}
                </div>

            </div>


            <div className="GobackBtn" onClick={() => {
                Navigate(-1)
            }}>
                <FaArrowLeft />
                Go Back.
            </div>
        </div>
    );
}

export default ProfileEdit;