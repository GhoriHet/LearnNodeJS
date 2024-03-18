const Users = require("../models/users.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createAccessRefreshToken = async (user_id) => {
    try {
        const user = await Users.findById(user_id);

        const accessToken = await jwt.sign(
            {
                _id: user_id,
                role: user.role,
                name: user.name
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
        );

        const refreshToken = await jwt.sign(
            {
                _id: user_id
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
        )

        return { accessToken, refreshToken }

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

        const { accessToken, refreshToken } = await createAccessRefreshToken(userExists._id);

        console.log("Access Token:", accessToken);
        console.log("-------------------------------------------")
        console.log("Refresh Token:", refreshToken);

    } catch (error) {
        console.log(error.message);
        throw error.message;
    }
};

module.exports = {
    register,
    login
}