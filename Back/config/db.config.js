// config/db.config.js
import mongoose from 'mongoose';
import dotenv from "dotenv";

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();


//Connexion à la base de données 
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connexion à la base de données établie");
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error.message);
    process.exit(1);
  }
};

export default connectDB;