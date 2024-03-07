import axios from "axios";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export async function createOrder(req, res) {
  const { productId, quantity } = req.body;

  try {
    let product;

    
    product = await Product.findById(productId);

   
    if (!product) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/product/get-product-by-id/${productId}`
        );
        product = response.data;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du produit depuis l'API :",
          error
        );
        return res
          .status(404)
          .json({
            error:
              "Le produit n'a pas été trouvé dans la base de données ni sur l'API.",
          });
      }
    }

    // Si le produit existe, créer la commande
    const order = new Order({
      productId: productId,
      image: product.imagePath, 
      quantity,
      price: product.price * quantity, 
    });

    await order.save();

    res
      .status(201)
      .json({ message: "La commande a été créée avec succès.", order });
  } catch (error) {
    console.error("Erreur lors de la création de la commande :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la commande." });
  }
}


export default {createOrder};
