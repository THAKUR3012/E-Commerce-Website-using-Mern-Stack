import express from "express"
import { addAddress, deleteAddress, editAddress, fetchAllAddress } from "../../controllers/shop/address.controller.js"

const AddressRoute = express.Router()

AddressRoute.post("/add", addAddress)
AddressRoute.get("/get/:userId", fetchAllAddress)
AddressRoute.put("/update/:userId/:addressId", editAddress)
AddressRoute.delete("/delete/:userId/:addressId", deleteAddress)


export default AddressRoute