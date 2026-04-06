// routes/otpRoutes.js

const express = require("express");
const authenticateToken = require("../middleware/jsonwebtoken");
const { sendMessage } = require("../controllers/MessageControllers/SendMessage");
const { getMyChatUsers } = require("../controllers/MessageControllers/MessagedUsers");
const { getChatMessages } = require("../controllers/MessageControllers/ReadMessage");
const upload = require("../middleware/Multer");
const router = express.Router();

router.post("/sent/:id",authenticateToken, 
    upload.single("message"),sendMessage );
router.get("/users",authenticateToken,getMyChatUsers );
router.get("/user/:id",authenticateToken,getChatMessages );
router.get("/",(req,res)=>{
    res.send("Message API Running...");
})

module.exports = router;