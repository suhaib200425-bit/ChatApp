

const mongoose = require("mongoose");
const Message = require("../../models/message");

const getChatMessages = async (req, res) => {
  try {
    let userId = req.params.id; // chat cheyyunna other user
    const myId = req.user.userId; // logged-in user (middleware ninn varum)

    let { page = 1, limit = 20 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    // validation
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      // return res.json({status:false, message: "Invalid userId" });
      userId=new mongoose.Types.ObjectId(userId);
    }

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userId },
        { senderId: userId, receiverId: myId }
      ]
    })
      .sort({ createdAt: 1 }) // latest first
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("senderId receiverId", "userName profileImage");

    // total count (pagination info)
    const total = await Message.countDocuments({
      $or: [
        { senderId: myId, receiverId: userId },
        { senderId: userId, receiverId: myId }
      ]
    });

    res.json({
      status: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalMessages: total,
      messages
    });

  } catch (error) {
    console.error(error);
    res.json({
      status:false,
      message: "Server Error",
      error:error.message
    });
  }
};

module.exports = { getChatMessages };