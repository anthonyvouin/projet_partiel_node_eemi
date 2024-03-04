// routes/product.route.js
import express from "express";
import { getAllCategories} from "../controllers/category.controller.js";

// Setup router
const router = express.Router();

// Appel des routes category
router.get("/get-all-category", getAllCategories);


export default router;
