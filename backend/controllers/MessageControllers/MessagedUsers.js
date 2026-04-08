const Message = require("../../models/message");
const mongoose = require("mongoose");

const getMyChatUsers = async (req, res) => {
  try {
    const myId = new mongoose.Types.ObjectId(req.user.userId);

    const users = await Message.aggregate([
      {
        $match: {
          $expr: {
            $ne: ["$senderId", "$receiverId"]
          },
          $or: [
            { senderId: myId },
            { receiverId: myId }
          ]
        }
      },
      {
        $project: {
          otherUser: {
            $cond: [
              { $eq: ["$senderId", myId] },
              "$receiverId",
              "$senderId"
            ]
          },
          message: 1,
          createdAt: 1
        }
      },
      {
        $sort: { createdAt: -1 } // latest messages first
      },
      {
        $group: {
          _id: "$otherUser",
          lastMessage: { $first: "$message" },
          lastMessageTime: { $first: "$createdAt" },
          lastMessageType: { $first: "$messageType" }
        }
      },
      {
        $sort: { lastMessageTime: -1 } // 🔥 IMPORTANT (final order)
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$user",
              {
                lastMessage: "$lastMessage",
                lastMessageTime: "$lastMessageTime",
                lastMessageType: "$lastMessageType"
              }
            ]
          }
        }
      }
    ]);
    res.json({
      status: true,
      users
    });

  } catch (error) {
    console.log("getMyChatUsers error:", error);
    res.json({
      status: false,
      message: "Failed to fetch chat users",
      error: error.message
    });
  }
};

module.exports = { getMyChatUsers };