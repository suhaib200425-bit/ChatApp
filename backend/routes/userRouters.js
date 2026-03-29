// routes/otpRoutes.js

const express = require("express");
const { registerOTP, loginOTP } = require("../controllers/UserControllers/send-otp");
const { RegisteVerify, LoginVerify } = require("../controllers/UserControllers/verify-otp");
const { checkLoged } = require("../controllers/UserControllers/check-loged");
const authenticateToken = require("../middleware/jsonwebtoken");
// import { sendOTP, verifyOTP } from "../controllers/otpController.js";

const router = express.Router();

router.post("/registered-otp", registerOTP);
router.post("/loged-otp", loginOTP);
router.post("/registered-verify", RegisteVerify);
router.post("/loged-verify",LoginVerify );
router.get("/check-loged",authenticateToken,checkLoged );
router.get("/",(req,res)=>{
    res.send("USER API Running...");
})

module.exports = router;