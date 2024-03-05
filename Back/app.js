// app.js
import express from "express";
import productRoute from "./src/routes/product.js";
import categoryRoute from "./src/routes/category.js";
import contactRoute from "./src/routes/contact.js";
import connectDB from "./config/db.config.js";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer"; // Importez Multer

// serveur
const app = express();
const port = 3000;

// Connexion à la base de données
connectDB();

// Utilisation de bodyParser pour parser le corps des requêtes en JSON
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Définition du dossier de stockage des images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images"); // Indiquez le dossier où enregistrer les images
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Utilisez le nom original du fichier
  },
});

const upload = multer({ storage: storage });

// Utilisation des routes
app.use("/api/product", upload.single("image"), productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/contact", contactRoute);

// Ecoute du server
app.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
});
