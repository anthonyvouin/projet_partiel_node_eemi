// routes/product.route.js
import express from "express";
import { createOrder} from "../controllers/order.controller.js";

// Setup router
const router = express.Router();

// Appel des routes category
router.post("/create", createOrder);

export default router;
