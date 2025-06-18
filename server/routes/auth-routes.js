import express from "express"
import { authMiddleware, LoginUser, LogoutUser, RegisterUser } from "../controllers/auth-controller.js"

const router = express.Router()

router.post("/register", RegisterUser)
router.post("/login", LoginUser)
router.post("/logout", LogoutUser)
router.get("/check-auth", authMiddleware, (req, res) => {
    const user = req.user
    res.status(200).json({
        success: true,
        message: "Authenticated User...!",
        user
    })
})


export default router