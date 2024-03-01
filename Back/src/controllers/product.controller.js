import axios from "axios";
import { Product } from "../models/productModel.js";

// Test
export const sayHello = (req, res) => {
  res.send("Coucou !");
};

// Logique controller product
export async function getAllProducts(req, res) {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    const productsData = response.data;
    const products = productsData.map(
      (product) =>
        new Product(
          product.id,
          product.title,
          product.price,
          product.description,
          product.category,
          product.image
        )
    );
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default { sayHello, getAllProducts };
