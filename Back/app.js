import express from "express";
import productRoute from "./src/routes/product.js";
import categoryRoute from "./src/routes/category.js";
import contactRoute from "./src/routes/contact.js";
import commandeRoute from "./src/routes/order.js";
import connectDB from "./config/db.config.js";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import fs from "fs";

// Start server express
const app = express();
const port = 3000;

// Base de données
connectDB();

// Faire  parser les corps de requête en JSON
app.use(bodyParser.json());

//  Middleware pour gérer les CORS
app.use(cors());

// Middleware pour parser les corps de requête encodés en URL
app.use(bodyParser.urlencoded({ extended: true }));

// Création du dossier pour stocker les images si celui-ci n'existe pas déjà

const dossier = "./public/images";
if (!fs.existsSync(dossier)) {
  fs.mkdir(dossier, { recursive: true }, (err) => {
    if (err) {
      console.error("Erreur lors de la création du dossier :", err);
      return;
    }
    console.log("Le dossier a été créé avec succès !");
  });
}

// Configuration de Multer pour la gestion du stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dossier);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Middleware pour servir les fichiers statiques
app.use("/public/images", express.static("public/images"));

// Définition des routes 
app.use("/api/product", upload.single("image"), productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/contact", contactRoute);
app.use("/api/order", commandeRoute);


app.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
});
