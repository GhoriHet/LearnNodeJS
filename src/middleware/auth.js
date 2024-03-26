const jwt = require("jsonwebtoken");
const Users = require("../models/users.model");

const auth = (roles) => async (req, res, next) => {
    if (req.isAuthenticated()) {
        try {
            const user = await Users.findById(req.user._id);

            const access_token = jwt.sign(
                {
                    _id: req.user._id,
                    name: user.name,
                    role: user.role,
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
            );
            const refresh_token = jwt.sign(
                {
                    _id: req.user._id,
                    name: user.name,
                    role: user.role,
                },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
            );

            user.refresh_token = refresh_token;
            await user.save({ validateBeforeSave: false });

            const options = {
                httpOnly: true,
                secure: true,
            };

            res.cookie("access_token", access_token, options);
            res.cookie("refresh_token", refresh_token, options);

            next();
        } catch (error) {
            console.error("Error:", error);
            return res
                .status(500)
                .json({ message: "Internal server error: Authentication" });
        }
    } else {
        try {
            const token =
                req.cookies?.access_token ||
                req.header("Authorization")?.replace("Bearer", "");

            if (!token) {
                res.status(401).json({ message: "Token not available." });
            }

            try {
                const validateToken = await jwt.verify(
                    token,
                    process.env.ACCESS_TOKEN_SECRET
                );

                const user = await Users.findById(validateToken._id).select(
                    "-password -refresh_token"
                );

                if (!user) {
                    res.status(404).json({ message: "User not found." });
                }

                if (!roles.some((value) => value === user.role)) {
                    return res.status(400).json({ message: "You have not permission." });
                }

                req.user = user;
            } catch (error) {
                res.status(401).json({ message: "Invalid Token." });
            }
        } catch (error) {
            res
                .status(500)
                .json({ message: "Internal server error: In Authentication" });
        }
    }
};

module.exports = {
    auth,
};
