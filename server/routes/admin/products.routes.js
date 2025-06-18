import express from "express";
import { upload } from "../../helpers/cloudinary.js";
import handleImageUpload, { addProduct, deleteProduct, editProduct, fetchProduct } from "../../controllers/admin/products.controller.js";

const adminProductRoute = express.Router();

// Use same field name as frontend
adminProductRoute.post("/upload-image", upload.single("my_file"), handleImageUpload);
adminProductRoute.post("/add", addProduct)
adminProductRoute.get("/get", fetchProduct)
adminProductRoute.put("/edit/:id", editProduct)
adminProductRoute.delete("/delete/:id", deleteProduct)

export default adminProductRoute;
