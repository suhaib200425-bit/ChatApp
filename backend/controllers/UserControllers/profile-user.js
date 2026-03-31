const User = require("../../models/user");

// GET /api/users/profile/:id
const ProfileUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id)
        if (!user) {
            res.json({
                status: false,
                message: 'User not founded'
            })
        }

        res.json({
            status: true,
            user: user,
            media: [],
            message: 'Search user data successfully'
        });

    } catch (error) {
        res.json({ status: false, message: "Server error" });
    }
};

module.exports = { ProfileUser };