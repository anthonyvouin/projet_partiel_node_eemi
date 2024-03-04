// routes/product.route.js
import express from "express";
import { sayHello, getAllProducts, getProductById, getProductsByCategory} from "../controllers/product.controller.js";

// Setup router
const router = express.Router();

// Appel des routes products
router.get("/coucou", sayHello);

router.get("/get-all-products", getAllProducts);
router.get("/get-product-by-id/:id", getProductById);
router.get("/get-product-by-category/:category", getProductsByCategory);


export default router;
