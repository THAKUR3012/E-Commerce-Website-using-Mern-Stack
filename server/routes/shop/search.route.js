import express from "express"
import { searchProduct } from "../../controllers/shop/search.controller.js"

const SearchRoute = express.Router()

SearchRoute.get("/:keyword", searchProduct)


export default SearchRoute