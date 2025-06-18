import express from "express"
import { getFilterProducts, getProductDetails } from "../../controllers/shop/products.controller.js"

const shopProductsRouter = express.Router()

shopProductsRouter.get("/get", getFilterProducts)
shopProductsRouter.get("/get/:id", getProductDetails)

export default shopProductsRouter