const otpStore = require("../../Store/Store");
const User = require('../../models/user')
const jwt = require("jsonwebtoken");

const RegisteVerify = async (req, res) => {
    try {
        const { otp, email } = req.body;

        const storedOtp = otpStore[email];

        if (!storedOtp) {
            return res.json({ status: false, message: "OTP expired or not found" });
        }

        if (storedOtp.otp !== otp) {
            return res.json({ status: false, message: "Invalid OTP" });
        }

        const usernamecheck = await User.findOne({ userName: storedOtp.username })
        if (usernamecheck) {
            res.json({
                status: false,
                message: 'username is already taken'
            })
        }

        const emailcheck = await User.findOne({ email: storedOtp.email })
        if (emailcheck) {
            res.json({
                status: false,
                message: 'email is already taken'
            })
        }
        console.log(storedOtp);


        const user = await User.create({
            userName: storedOtp.username,
            email: storedOtp.email,
            profileImage: ''
        });

        delete otpStore[email]; // OTP remove after success

        res.json({ status: true, message: "user registered successfully", user: user });
    } catch (err) {
        res.json({ status: false, message: 'server error', Error: err.message })
    }
};

const LoginVerify = async (req, res) => {
    try {
        const { otp, username } = req.body;

        const user = await User.findOne({ userName: username })
        if (!user) {
            return res.json({
                status: false,
                message: 'User is not found'
            })
        }
        const payload = {
            userId: user._id,
            username: user.userName
        };

        const token = jwt.sign(payload, process.env.JWT_TOKEN, {
            expiresIn: "1h"
        });

        console.log("Generated Token:", token);
        const storedOtp = otpStore[user.email];

        if (!storedOtp) {
            return res.json({ status: false, message: "OTP expired or not found" });
        }

        if (storedOtp.otp !== otp) {
            return res.json({ status: false, message: "Invalid OTP" });
        }

        delete otpStore[user.email]; // OTP remove after success

        res.json({ status: true, message: "user loged successfully", user: user,token:token });
    } catch (err) {
        res.json({ status: false, message: 'server error', Error: err.message })
    }
};

module.exports = { RegisteVerify, LoginVerify };