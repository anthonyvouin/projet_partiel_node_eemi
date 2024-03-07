// routes/product.route.js
import express from "express";
import { createOrder, getAllOrders} from "../controllers/order.controller.js";

// Setup router
const router = express.Router();

// Appel des routes category
router.post("/create", createOrder);
router.get("/get-all-order" , getAllOrders)

export default router;
