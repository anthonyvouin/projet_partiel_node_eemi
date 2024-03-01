// routes/product.route.js
import express from "express";
import { sayHelloCategory, getAllCategories} from "../controllers/category.controller.js";

// Setup router
const router = express.Router();

// Appel des routes products
router.get("/test", sayHelloCategory);
router.get("/get-all-category", getAllCategories);



// Appel des routes category

//Appel des routes contact

export default router;
