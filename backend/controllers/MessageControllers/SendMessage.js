const Message = require("../../models/message");

// Send / Save Message
const sendMessage = async (req, res) => {
    try {
        const { message, messageType } = req.body;
        if (!message) {
            return res.json({
                status: false,
                message: "Message Is Required"
            })
        }
        if (!messageType) {
            return res.json({
                status: false,
                message: "Message Type Is Required"
            })
        }
        const senderId = req.user.userId
        const receiverId = req.params.id
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            messageType: messageType || "text",
        });

        const savedMessage = await newMessage.save();
        const populateMessage = await Message.findById(savedMessage._id)
            .populate("senderId")
            .populate("receiverId");
        res.json({
            status: true,
            data: populateMessage,
        });
    } catch (error) {
        res.json({
            status: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

module.exports = { sendMessage };