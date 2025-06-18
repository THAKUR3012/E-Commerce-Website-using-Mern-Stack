import express from "express"
import { addToCart, deleteCartItem, fetchCartItems, updateCartItemQty } from "../../controllers/shop/cart.controller.js"

const CartRouter = express.Router()

CartRouter.post("/add", addToCart)
CartRouter.get("/get/:userId", fetchCartItems)
CartRouter.put("/update-cart", updateCartItemQty)
CartRouter.delete("/:userId/:productId", deleteCartItem)


export default CartRouter