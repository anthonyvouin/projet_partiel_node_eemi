// routes/product.route.js
import express from "express";
import { sayHelloCategory} from "../controllers/category.controller.js";

// Setup router
const router = express.Router();

// Appel des routes products
router.get("/test", sayHelloCategory);


// Appel des routes category

//Appel des routes contact

export default router;
