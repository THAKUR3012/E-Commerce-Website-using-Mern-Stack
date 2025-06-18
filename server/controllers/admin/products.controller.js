import imageUploadUtils from "../../helpers/cloudinary.js";
import Product from "../../models/product.model.js";

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const dataUrl = `data:${req.file.mimetype};base64,${b64}`;
        const result = await imageUploadUtils(dataUrl);

        res.json({ success: true, result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Upload failed" });
    }
};

export default handleImageUpload;

export const addProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body
        const newlyCreateProduct = new Product({
            image, title, description, category, brand, price, salePrice, totalStock
        })

        await newlyCreateProduct.save()

        return res.status(201).json({
            success: true,
            data: newlyCreateProduct
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error occure",
            success: false
        })
    }
}


export const fetchProduct = async (req, res) => {
    try {
        const listOfProduct = await Product.find({})
        return res.status(200).json({
            data: listOfProduct,
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error occure",
            success: false
        })
    }
}


export const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock, // kept as-is to match your original
        } = req.body;

        let findProduct = await Product.findById(id);

        if (!findProduct) {
            return res.status(404).json({
                message: "Product not Found",
                success: false,
            });
        }

        findProduct.image = image || findProduct.image;
        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price === "" ? 0 : price || findProduct.price;
        findProduct.salePrice = salePrice === "" ? 0 : salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;

        await findProduct.save();

        return res.status(200).json({
            success: true,
            data: findProduct,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error occure",
            success: false,
        });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not Found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Product deleted successfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error occurred",
            success: false,
        });
    }
};
