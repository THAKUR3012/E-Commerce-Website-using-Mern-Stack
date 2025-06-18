import express from "express"
import { capturePayment, createOrder, getAllOrdersByUser, getOrderDetails } from "../../controllers/shop/order.controller.js"

const OrderRoute = express.Router()

OrderRoute.post("/create", createOrder)
OrderRoute.post("/capture", capturePayment)
OrderRoute.get("/list/:userId", getAllOrdersByUser)
OrderRoute.get("/details/:id", getOrderDetails)

export default OrderRoute