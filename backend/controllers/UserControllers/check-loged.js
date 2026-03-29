const User = require("../../models/user");

const checkLoged = async (req, res) => {
    try {
        const { userId } = req.user
        const user = await User.findById(userId)
        if (!user) {
            return res.json({
                status: false,
                message: "user is not found !"
            })
        }
        res.json({
            status: true,
            user:user,
            message: "user already loged"
        })
    } catch (err) {
        res.json({
            status: false,
            message: "Server error",
            error: err.message
        });
    }
};


module.exports = { checkLoged };
