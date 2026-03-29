const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.json({
        status: false,
        message: 'Token Is Not Found'
    });

    jwt.verify(token,process.env.JWT_TOKEN , (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;