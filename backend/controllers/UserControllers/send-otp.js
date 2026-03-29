const User = require("../../models/user")

// controllers/otpController.js
const GenerateOTP = require("../../utils/otpgenerator");
const nodemailer = require("nodemailer");
const otpStore = require("../../Store/Store")

const registerOTP = async (req, res) => {
    try {
        console.log(req.body);

        const { email, username } = req.body;

        const otp = GenerateOTP()
        otpStore[email] = {
            otp: otp,
            email: email,
            username: username
        };

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}`,
        });

        res.json({ status: true, message: "OTP sent successfully" });
    } catch (err) {
        res.json({ status: false, message: 'server error', error: err.message });
    }
};

const loginOTP = async (req, res) => {
    try {

        const { username } = req.body;
        const user = await User.findOne({ userName: username })
        if (!user) {
            res.json({ status: false, message: "User Is Not Found " });
        }
        const otp = GenerateOTP()
        otpStore[user.email] = {
            otp: otp,
            username: username
        };
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: user.email,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}`,
        });

        res.json({ status: true, message: "OTP sent successfully" });
    } catch (err) {

        res.json({ status: false, message: "Server error", error: err.message });
    }
};

module.exports = {
    registerOTP,
    loginOTP
};