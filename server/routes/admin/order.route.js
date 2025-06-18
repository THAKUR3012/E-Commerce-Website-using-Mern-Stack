import express from "express"
import { getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus } from "../../controllers/admin/order.controller.js";

const AdminOrderRoute = express.Router();

AdminOrderRoute.get("/get", getAllOrdersOfAllUsers);
AdminOrderRoute.get("/details/:id", getOrderDetailsForAdmin);
AdminOrderRoute.put("/update/:id", updateOrderStatus);


export default AdminOrderRoute