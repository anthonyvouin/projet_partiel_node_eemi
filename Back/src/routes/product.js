import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory, 
  deleteProduct, updateProduct,
  getAllProductsDB
} from "../controllers/product.controller.js";

const router = express.Router();


// Appel des routes products api
router.get("/get-all-products", getAllProducts);
router.get("/get-product-by-id/:id", getProductById);
router.get("/get-product-by-category/:category", getProductsByCategory);

// Appel des routes products bdd
router.post("/create", createProduct);
router.get("/get-all-productsDb",getAllProductsDB);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);



export default router;
