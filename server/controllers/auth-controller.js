import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"


// register

export const RegisterUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const checkUser = await User.findOne({ email })
        if (checkUser) {
            return res.json({
                success: false,
                message: "User already exist.  Try to another email"
            })
        }

        const hashPassword = await bcrypt.hash(password, 12)
        const newUser = await User({
            username, email, password: hashPassword
        })
        await newUser.save()
        res.status(200).json({
            success: true,
            message: "Registion successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}


// Login

export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.json({
                success: false,
                message: "User doesn't exist. Please try again.",
            });
        }

        const checkPassword = await bcrypt.compare(password, checkUser.password);
        if (!checkPassword) {
            return res.json({
                success: false,
                message: "Password is incorrect. Please try again.",
            });
        }

        const token = jwt.sign(
            {
                id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,
                username: checkUser.username
            },
            "CLIENT_SECRET_KEY",
            { expiresIn: "60min" }
        );

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: false,
            })
            .json({
                success: true,
                message: "Login successfully",
                user: {
                    email: checkUser.email,
                    role: checkUser.role,
                    id: checkUser._id,
                    username: checkUser.username
                },
            });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
        });
    }
};



//Logout

export const LogoutUser = (req, res) => {
    res.clearCookie("token");
    res.json({
        success: true,
        message: "Logged out successfully",
    });
};


// AuthMiddleware


export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorised user"
            })
        }

        const decoded = jwt.verify(token, "CLIENT_SECRET_KEY")
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Unauthorised user"
        })
    }
}