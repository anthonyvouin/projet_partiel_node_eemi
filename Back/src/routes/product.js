import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory, 

} from "../controllers/product.controller.js";

const router = express.Router();


// Appel des routes products
router.get("/get-all-products", getAllProducts);
router.get("/get-product-by-id/:id", getProductById);
router.get("/get-product-by-category/:category", getProductsByCategory);
router.post("/create", createProduct);

export default router;
