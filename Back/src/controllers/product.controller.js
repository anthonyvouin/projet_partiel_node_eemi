import axios from "axios";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import fs from "fs";
import path from "path";
import { randomBytes } from "crypto";
import { rename } from "fs/promises";
import { unlink } from "fs/promises"; // Importer la fonction unlink pour supprimer le fichier

// Catégories autorisées
const allowedCategories = ["electronics", "jewelery", "men's clothing", "women's clothing"];



// controller pour recuperer tous les produits
export async function getAllProducts(req, res) {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    const productsData = response.data;

    // Mapping des données pour créer un objet pour chaque produit
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



// controller pour créer un new product dbb
export async function createProduct(req, res) {
  const { title, price, description, category } = req.body;

  // Vérifier si un fichier image a été téléchargé
  if (!req.file) {
    return res.status(400).json({ error: "Aucune image n'a été téléchargée." });
  }

  const imagePath = req.file.path;

  try {
    // Vérifier si la catégorie est autorisée
    if (!allowedCategories.includes(category)) {
      // Supprimer l'image non valide
      await unlink(imagePath);

      return res
        .status(400)
        .json({ error: "La catégorie spécifiée n'est pas valide." });
    }

    const randomName = randomBytes(8).toString("hex") + ".jpg";
    const imageNewPath = path.join(path.dirname(imagePath), randomName);

    await rename(imagePath, imageNewPath);

    const newProduct = new Product({
      title,
      price,
      description,
      category,
      image: imageNewPath,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Erreur lors de la création du produit :", error);
    res.status(500).json({ error: "Erreur lors de la création du produit" });
  }
}

//Controller delete product bdd dans la bdd
export async function deleteProduct(req, res) {
  const productId = req.params.id; // Récupérer l'ID du produit à supprimer

  try {
    // Trouver le produit dans la base de données par son ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Le produit n'a pas été trouvé." });
    }

    // Supprimer l'image associée du dossier public/images si elle existe
    if (fs.existsSync(product.image)) {
      fs.unlinkSync(product.image);
    }

    // Supprimer le produit de la base de données
    await Product.findByIdAndDelete(productId);

    // Répondre avec un message indiquant que le produit a été supprimé avec succès
    res.json({ message: "Le produit a été supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression du produit." });
  }
}

//Controller update product bdd
export async function updateProduct(req, res) {
  const productId = req.params.id;
  const { title, price, description, category } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Le produit n'a pas été trouvé." });
    }

    let imagePath;



      // Vérifier si la catégorie est autorisée
    if (!allowedCategories.includes(category)) {
        
      if (req.file) {
      imagePath = req.file.path;

        // Supprimer l'image non valide
        await unlink(imagePath);
      }
        return res
          .status(400)
          .json({ error: "La catégorie spécifiée n'est pas valide." });
      
      }
    

   
    if (req.file) {

      imagePath = req.file.path;


      // Générer un nouveau nom d'image aléatoire
      const randomName = randomBytes(8).toString("hex") + ".jpg";
      const newImagePath = path.join(path.dirname(imagePath), randomName);

      // Déplacer le fichier vers le nouveau chemin
      await rename(imagePath, newImagePath);

      // Supprimer l'ancienne image si elle existe
      if (fs.existsSync(product.image)) {
        fs.unlinkSync(product.image);
      }

      product.image = newImagePath;
    }

    product.title = title;
    product.price = price;
    product.description = description;
    product.category = category;

    await product.save();

    res.json({ message: "Le produit a été mis à jour avec succès.", product });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour du produit." });
  }
}

// Controller pour recuperer tous les produits dbb
export async function getAllProductsDB(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des produits." });
  }
}

// Controller pour reucperer une produit en fonction de son id
export async function getProductByIdDb(req, res) {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Produit non trouvé." });
    }

    res.status(200).json( product );
  } catch (error) {
    console.error("Erreur lors de la récupération du produit :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération du produit." });
  }
}

// Controller pour recuperer les produits en fonction d'une category
export async function getProductsByCategoryDB(req, res) {
  const category = req.params.category; // Récupérer la catégorie depuis les paramètres de la requête

  try {
    // Vérifier si la catégorie demandée est autorisée
    if (!allowedCategories.includes(category)) {
      return res
        .status(400)
        .json({ error: "La catégorie spécifiée n'est pas valide." });
    }

    // Récupérer les produits correspondant à la catégorie demandée depuis la base de données
    const products = await Product.find({ category });

    // Répondre avec les produits trouvés
    res.status(200).json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits par catégorie :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des produits par catégorie." });
  }
}