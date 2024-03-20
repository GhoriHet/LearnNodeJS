const Users = require("../models/users.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createAccessRefreshToken = async (user_id) => {
    try {
        const user = await Users.findById(user_id);

        const access_token = await jwt.sign(
            {
                _id: user_id,
                role: user.role,
                name: user.name
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
        );

        const refresh_token = await jwt.sign(
            {
                _id: user_id
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
        )

        user.refresh_token = refresh_token;

        user.save({ validateBeforeSave: false })

        return { access_token, refresh_token }

    } catch (error) {
        console.log(error.message)
        throw error.message
    }
}

const register = async (req, res) => {
    try {
        const { email, mobile_no, password } = req.body;

        const userExists = await Users.findOne({
            $or: [{ email, mobile_no }]
        })

        if (userExists) {
            return res.status(401).json({
                success: false,
                message: "User already exists",
                data: {}
            })
        };

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await Users.create({ ...req.body, password: hashPassword });

        const userData = await Users.findById(user._id).select("-password -refresh_token")

        if (!userData) {
            return res.status(401).json({
                success: false,
                message: "User registration failed. Please try again.",
                data: {}
            })
        }

        return res.status(200).json({
            success: true,
            message: "User registration successfully.",
            data: userData
        })

    } catch (error) {
        console.log(error.message)
    }
}

const login = async (req, res) => {
    try {
        const { email, mobile_no, password } = req.body;

        const userExists = await Users.findOne({
            $or: [{ email }, { mobile_no }]
        });

        if (!userExists) {
            return res.status(401).json({
                success: false,
                message: "User with email or mobile_no does not exist.",
                data: {}
            });
        }

        const hashPassword = await bcrypt.compare(password, userExists.password);

        if (!hashPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
                data: {}
            });
        }

        const { access_token, refresh_token } = await createAccessRefreshToken(userExists._id);

        const userData = await Users.findById(userExists._id).select("-password -refresh_token");

        const options = {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 60 * 24 * 15
        }

        res
            .cookie("access_token", access_token, options)
            .cookie("refresh_token", refresh_token, options)
            .status(200)
            .json({
                success: true,
                message: "User Login successfully.",
                data: { access_token, refresh_token, userData }
            })

    } catch (error) {
        console.log(error.message);
        throw error.message;
    }
};

const generateNewToken = async (req, res) => {
    try {
        const Token = req.cookies?.refresh_token || req.body?.refresh_token

        if (!Token) {
            return res.status(401).json({
                message: "Token required!"
            })
        }

        const user = await Users.findOne({ refresh_token: Token }).select("-password -refresh_token")

        if (!user) {
            return res.status(404).json({
                message: "User not found!"
            })
        }

        const { access_token, refresh_token } = await createAccessRefreshToken(user._id)

        const userData = await Users.findOne(user._id).select("-password -refresh_token")

        const options = {
            httpOnly: true,
            secure: true
        }

        res.cookie('access_token', access_token, options)
        res.cookie('refresh_token', refresh_token, options)

        res.status(200).json({
            success: true,
            data: { ...userData, access_token: access_token },
            message: 'New tokens generated!!'
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        const token = req.cookies?.refresh_token;

        if (!token) {
            res.status(401).json({ message: "Token not available." })
        }

        const userExists = await Users.findOneAndUpdate({ refresh_token: token }, { $unset: { refresh_token: token } });
        console.log("USER EXISTS", userExists);

        res.clearCookie("refresh_token");
        res.clearCookie("access_token");
        
        res.status(200).json({
            message: "Logout successfully"
        })

    } catch (error) {
        console.log(error.message)
        throw error.message
    }
}

module.exports = {
    register,
    login,
    generateNewToken,
    logout
}