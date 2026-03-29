import React, { useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./Edit.css";
import { useNavigate } from "react-router-dom";

function ProfileEdit() {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const Navigate=useNavigate()
    const [image, setImage] = useState(null);
    const profileRef = useRef()
    const handleImage = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, bio);
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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


            <div className="GobackBtn" onClick={()=>{
                Navigate(-1)
            }}>
<FaArrowLeft />
Go Back.
            </div>
        </div>
    );
}

export default ProfileEdit;