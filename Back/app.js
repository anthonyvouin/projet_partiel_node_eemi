// app.js
import express from "express";
import productRoute from "./src/routes/product.js";
import categoryRoute from "./src/routes/category.js";
import contactRoute from "./src/routes/contact.js";
import connectDB from "./config/db.config.js";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer"; // Importez Multer
import fs from 'fs'
// serveur
const app = express();
const port = 3000;

// Connexion à la base de données
connectDB();

// Utilisation de bodyParser pour parser le corps des requêtes en JSON
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Creer le dossier de destination s'il n'existe pas
const dossier = './public/images';
if (!fs.existsSync(dossier)) {
  fs.mkdir(dossier, { recursive: true }, (err) => {
    if (err) {
      console.error('Erreur lors de la création du dossier :', err);
      return;
    }
    console.log('Le dossier a été créé avec succès !');
  });
} 

// Définition du dossier de stockage des images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dossier);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
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
