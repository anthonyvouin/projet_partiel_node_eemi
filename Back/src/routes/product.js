// routes/product.route.js
import express from "express";
import { sayHello } from "../controllers/product.controller.js";

// Setup router
const router = express.Router();

// Appel des routes
router.get("/coucou", sayHello);


export default router;
