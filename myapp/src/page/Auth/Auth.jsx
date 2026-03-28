import React, { useState, useRef } from "react";
import "./Auth.css";

export default function SignupPage() {
    const [OTPScreen, setOTPScreen] = useState(false)
    const [Page, setPage] = useState('Login')
    const handleSubmit = (e) => {
        e.preventDefault()
        setOTPScreen(prev => !prev)
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
                        <input type="text" className="col-12 mb-2" placeholder="UserName " />
                        {Page == 'Register' && <input type="email" className="col-12 mb-2" placeholder="Email Address" />}

                        {OTPScreen && <OTPInput />}
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

function OTPInput() {
    const inputs = Array(4).fill(0);
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;

        // Allow only digits
        if (!/^\d?$/.test(value)) return;

        e.target.value = value;

        // Move to next input
        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Backspace logic
        if (e.key === "Backspace") {
            if (e.target.value === "" && index > 0) {
                inputRefs.current[index - 1].focus();
            } else {
                e.target.value = "";
            }
        }
    };


    return (
        <div className="otp-container mb-2">
            <h5>Enter The Otp</h5>
            <div className="otp-boxs">
                {inputs.map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className="otp-box"
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