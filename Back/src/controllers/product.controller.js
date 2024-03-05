import axios from "axios";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import fs from "fs";
import path from "path";
import { randomBytes } from "crypto";
import { rename } from "fs/promises";

// controller pour recuperer tous les produits
export async function getAllProducts(req, res) {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    const productsData = response.data;

    // Mapping des données pour créer un objet littéral pour chaque produit
    const products = productsData.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    }));

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// controller pour recuperer un produit par id
export async function getProductById(req, res) {
  const productId = req.params.id; // Récupérer l'ID dynamique depuis les paramètres de la requête

  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${productId}`
    );
    const productData = response.data;

    // Vérifier si le produit existe
    if (productData) {
      const product = {
        id: productData.id,
        title: productData.title,
        price: productData.price,
        description: productData.description,
        category: productData.category,
        image: productData.image,
      };
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// controller pour recupere tous les produits en fonction d'une category
export async function getProductsByCategory(req, res) {
  const { category } = req.params; // Récupère la catégorie spécifique depuis les paramètres de la requête

  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`
    );
    const products = response.data;

    // Transformation des données des produits
    const formattedProducts = products.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    }));

    // Envoi des produits formatés en tant que réponse JSON
    res.json(formattedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Catégories autorisées
const allowedCategories = ["electronics", "diamond", "jewelery", "men's clothing", "women's clothing"];



// controller pour créer un new product
export async function createProduct(req, res) {
  const { id, title, price, description, category } = req.body;
  const imagePath = req.file.path;

  try {
    // Vérifier si la catégorie est autorisée
    if (!allowedCategories.includes(category)) {
      // Supprimer le fichier image s'il existe
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
      return res
        .status(400)
        .json({ error: "La catégorie spécifiée n'est pas valide." });
    }

    // Générer un nom d'image aléatoire
    const randomName = randomBytes(8).toString("hex") + ".jpg";
    const imageNewPath = path.join(path.dirname(imagePath), randomName);

    // Renommer le fichier si la catégorie est valide
    await rename(imagePath, imageNewPath);

    const newProduct = new Product({
      id,
      title,
      price,
      description,
      category,
      imagePath: imageNewPath,
    });

    // Enregistrer le produit dans la base de données
    await newProduct.save();

    // Répondre avec le produit créé
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Erreur lors de la création du produit :", error);
    res.status(500).json({ error: "Erreur lors de la création du produit" });
  }
}


export default {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
};
