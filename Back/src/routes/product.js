// routes/product.route.js
import express from "express";
import { sayHello, getAllProducts, getProductById} from "../controllers/product.controller.js";

// Setup router
const router = express.Router();

// Appel des routes products
router.get("/coucou", sayHello);
router.get("/get-all-products", getAllProducts);
router.get("/get-by-id/:id", getProductById )


// Appel des routes category

//Appel des routes contact

export default router;
