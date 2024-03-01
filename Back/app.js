// app.js
import express from 'express';
import productRoute from "./src/routes/product.js";
import connectDB from './config/db.config.js';
import bodyParser from 'body-parser';
import cors from 'cors'; 


// serveur
const app = express();
const port = 3000


// Connexion à la base de données
connectDB();


// Utilisation de bodyParser pour parser le corps des requêtes en JSON
app.use(bodyParser.json());
app.use(cors());



// Utilisation des routes
app.use('/product', productRoute); 

// Ecoute du server
app.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
});
