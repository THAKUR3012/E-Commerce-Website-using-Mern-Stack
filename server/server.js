import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import router from "./routes/auth-routes.js"
import { connectDb } from "./Db/dbConnect.js"
import dotenv from 'dotenv'
import adminProductRoute from "./routes/admin/products.routes.js"
import shopProductsRouter from "./routes/shop/products.route.js"
import CartRouter from "./routes/shop/cart.route.js"
import AddressRoute from "./routes/shop/address.route.js"
import OrderRoute from "./routes/shop/order.route.js"
import AdminOrderRoute from "./routes/admin/order.route.js"
import SearchRoute from "./routes/shop/search.route.js"
import ReviewRoute from "./routes/shop/review.route.js"
import FeatureRoute from "./routes/common/feature.route.js"


dotenv.config()

// create a database connection -> u can also

// create a separate file for this and then import  / use that file 
connectDb()



const app = express()

const PORT = process.env.PORT || 5000

app.use(
    cors({
        // origin: "http://localhost:5173",
        origin: "https://e-commerce-frontend-tbka.onrender.com",

        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expries",
            "Pragma"
        ],
        credentials: true
    })
)

app.use(cookieParser())
app.use(express.json())

app.use("/api/v1/auth", router)
app.use("/api/v1/admin", adminProductRoute)
app.use("/api/v1/admin/orders", AdminOrderRoute)
app.use("/api/v1/shop", shopProductsRouter)
app.use("/api/v1/cart", CartRouter)
app.use("/api/v1/address", AddressRoute)
app.use("/api/v1/order", OrderRoute)
app.use("/api/v1/search", SearchRoute)
app.use("/api/v1/review", ReviewRoute)

app.use("/api/v1/feature", FeatureRoute)


app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`)
})