const Message = require('../../models/message')
const ReadMessage = async (req, res) => {
    try {
        const { chatuserId } = req.params.id;

        const updatedMessage = await Message.updateMany(
            { senderId: { $in: chatuserId } },
            { $set: { isRead: false } }
        );

        res.json({
            success: true,
            message: 'All Message Is Read',
            updatedMessage
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Toggle failed",
            error: error.message,
        });
    }
};

module.exports = { ReadMessage };