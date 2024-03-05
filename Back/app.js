import express from "express";
import productRoute from "./src/routes/product.js";
import categoryRoute from "./src/routes/category.js";
import contactRoute from "./src/routes/contact.js";
import connectDB from "./config/db.config.js";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import fs from "fs";

const app = express();
const port = 3000;

connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use("/api/product", upload.single("image"), productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/contact", contactRoute);

app.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
});
