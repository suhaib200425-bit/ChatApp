import React, { useState, useRef } from "react";
import "./Auth.css";
import { toast } from "react-toastify";
import axios from "axios"
import { BACKENDURL } from "../../assets/assets";
import { useChatContext } from "../../context/ChatContext";
export default function SignupPage() {
    const [OTPScreen, setOTPScreen] = useState(false)
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const {user,setUser}=useChatContext()
    const [OTP, setOTP] = useState('')
    const [Page, setPage] = useState('Login')
    const handleSubmit = async (e) => {
        e.preventDefault()
        if ((Page == 'Login' ? userName : userName && email) && !OTPScreen) {
            let response
            if (Page == 'Register') {
                response = await axios.post(
                    `${BACKENDURL}/api/user/registered-otp`,
                    {
                        email: email,
                        username:userName
                    }
                )
            } else {
                response = await axios.post(
                    `${BACKENDURL}/api/user/loged-otp`,
                    {
                        username: userName
                    }
                )
            }

            console.log('response');
            console.log(response.data);
            if (response.data.status) {
                toast.info(response.data.message)
                setOTPScreen(true)
            } else {
                toast.error(response.data.message)
            }
        } else {
            if (OTP.length >= 4) {
                if (Page == 'Login') {
                    const response = await axios.post(
                        `${BACKENDURL}/api/user/loged-verify`,
                        {
                            otp: OTP,
                            username: userName
                        }
                    )
                    console.log('LOGING RESPONSE');
                    console.log(response.data);
                    setUser(response.data.user)
                    localStorage.setItem('token',response.data.token)
                }
                if (Page == 'Register') {
                    const response = await axios.post(
                        `${BACKENDURL}/api/user/registered-verify`,
                        {
                            otp: OTP,
                            email: email,
                            username:userName
                        }
                    )
                    console.log('REGISTER RESPONSE');
                    console.log(response.data);
                }
            } else {
                toast.error('Enter the OTP')
            }
        }
    }
    return (
        <div className="container">
            <div className="glow"></div>

            <div className="content">
                {/* Left Side */}
                <div className="left">
                    <div className="BOX">
                        <div className="logo-box">💬</div>
                        <h1>QuickChat</h1>
                    </div>
                </div>

                {/* Right Side */}
                <form className="form-box" onSubmit={handleSubmit}>
                    <h2>{Page == 'Login' ? 'Login' : 'Sign up'}</h2>

                    <div className="">
                        <input type="text" className="col-12 mb-2" placeholder="UserName " disabled={OTPScreen?true:false} onChange={(e) => {
                            setUserName(e.target.value)
                        }} />
                        {Page == 'Register' && <input type="email" className="col-12 mb-2" placeholder="Email Address"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }} />}

                        {OTPScreen && <OTPInput setOTP={setOTP} />}
                        <button type="submit" className="col-12 mb-2" onSubmit={handleSubmit} >{
                            OTPScreen ?
                                Page == 'Login' ?
                                    'Login'
                                    : 'Register'
                                : 'Send Otp'
                        }</button>

                        <div className="terms">
                            <input type="checkbox" />
                            <span>Agree to the terms of use & privacy policy</span>
                        </div>

                        <p className="login-text">
                            {
                                Page == 'Login' ? 'Create have an new account' : 'Already have an account?'
                            } <span onClick={
                                () => {
                                    setPage(prev => {
                                        if (prev == 'Login') return 'Register'
                                        return 'Login'
                                    })
                                    setOTPScreen(false)
                                }
                            }>{
                                    Page == 'Login' ? 'Login here' : 'Register her'
                                }</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* ================= CSS ================= */

/* styles.css */
/* ================= OTP INPUT ================= */


function OTPInput({ setOTP }) {

    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (!/^[a-zA-Z0-9]*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;

        setOtp(newOtp);
        setOTP(newOtp.join(""));

        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {

        if (e.key === "Backspace") {

            const newOtp = [...otp];

            // remove current value
            if (newOtp[index]) {
                newOtp[index] = "";
                setOtp(newOtp);
                setOTP(newOtp.join(""));
            }
            // move to previous box
            else if (index > 0) {
                inputRefs.current[index - 1].focus();

                newOtp[index - 1] = "";
                setOtp(newOtp);
                setOTP(newOtp.join(""));
            }
        }
    };

    return (
        <div className="otp-container mb-2">
            <h5>Enter The Otp</h5>

            <div className="otp-boxs">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className="otp-box"
                        value={digit}
                        ref={(el) => (inputRefs.current[index] = el)}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                ))}
            </div>
        </div>
    );
}


/* OTP CSS */