const User = require("../../models/user");

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // from auth middleware

    const { username, bio } = req.body;

    let updateData = {
      userName: username,
      bio:bio
    };

    // ✅ If image uploaded
    console.log(req.file);
    if (req.file) {
      updateData.profileImage = req.file.secure_url; 
    }

 const updatedUser = await User.findByIdAndUpdate(
  userId,
  updateData,
  { returnDocument: 'after', runValidators: true }
).select("-password");

    res.json({
      status: true,
      user: updatedUser
    });

  } catch (error) {
    res.json({
      status: false,
      message: "server error",
      error: error.message
    });
  }
};

module.exports = { updateProfile };