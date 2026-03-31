const User = require("../../models/user");

// GET /api/users/search?query=an
const searchUsers = async (req, res) => {
  try {
    const {query} = req.query;

    console.log(req.query);

    if (!query) {
      return res.json({ status: false, message: "Search query required" });
    }

    const users = await User.find({
  userName: { $regex: `^${query}`, $options: 'i' }
    }).select("userName profileImage");

    res.json({
      status: true,
      users: users,
      message: 'Search user data successfully'
    });

  } catch (error) {
    res.json({ status: false, message: "Server error" });
  }
};

module.exports = { searchUsers };