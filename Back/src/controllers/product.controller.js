import axios from "axios";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import fs from "fs";
import path from "path";

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

// controller pour créer un new product
export async function createProduct(req, res) {
  const { id, title, price, description, category } = req.body;
  console.log(req);
  const { image } = req.file; 

  try {
    const imagePath = path.join(__dirname, "../public/images"); 
    if (!fs.existsSync(imagePath)) {
      fs.mkdirSync(imagePath, { recursive: true }); 
    }

    const imageFileName = `${id}-${image.originalname}`; 
    const imagePathFull = path.join(imagePath, imageFileName); 
    await fs.promises.writeFile(imagePathFull, image.buffer); 
    const newProduct = new Product({
      id,
      title,
      price,
      description,
      category,
      imagePath: imagePathFull, 
    });

    // Enregistrer le produit dans la base de données
    await newProduct.save();

    // Répondre avec le produit créé
    res.status(201).json(newProduct);
  } catch (error) {
    // En cas d'erreur, répondre avec un message d'erreur
    console.error("Erreur lors de la création du produit :", error);
    res.status(500).json({ error: "Erreur lors de la création du produit" });
  }
}

export default { getAllProducts, getProductById, getProductsByCategory, createProduct };
