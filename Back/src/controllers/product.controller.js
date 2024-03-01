import axios from "axios";

// Test
export const sayHello = (req, res) => {
  res.send("Coucou !");
};

// controller pour recuperer tous les produits
export async function getAllProducts(req, res) {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    const productsData = response.data;
    
    // Mapping des données pour créer un objet littéral pour chaque produit
    const products = productsData.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image
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

export default { sayHello, getAllProducts, getProductById};
