const jwt = require('jsonwebtoken');
const Users = require('../models/users.model');

const auth = () => async (req, res, next) => {
    try {
        const token = req.cookies?.access_token || req.header("Authorization")?.replace("Bearer", "");

        if (!token) {
            res.status(401).json({ message: "Token not available." })
        }

        try {
            const validateToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            const user = await Users.findById(validateToken._id).select("-password -refresh_token");

            if (!user) {
                res.status(404).json({ message: "User not found." })
            }

            req.user = user;

            next();

        } catch (error) {
            res.status(401).json({ message: "Invalid Token." })
        }

    } catch (error) {
        res.status(500).json({ message: "Internal server error: In Authentication" })
    }
}

module.exports = {
    auth
}