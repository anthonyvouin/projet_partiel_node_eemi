import express from "express";
import { sendEmail} from "../controllers/contact.controller.js";

// Setup router
const router = express.Router();

// Appel des routes contact
router.post("/send-email", sendEmail);


export default router;
