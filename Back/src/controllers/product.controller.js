import axios from "axios";
import NewsAPI from "newsapi"; // Assurez-vous d'installer cette bibliothèque (npm install newsapi)

//Logique controller
export const sayHello = (req, res) => {
  res.send("Coucou !");
};

export default {sayHello };