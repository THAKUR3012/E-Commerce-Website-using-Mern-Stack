import express from "express"
import { addProductReview, getProductReviews } from "../../controllers/shop/review.controller.js"

const ReviewRoute = express.Router()

ReviewRoute.post("/add", addProductReview)
ReviewRoute.get("/:productId", getProductReviews)


export default ReviewRoute