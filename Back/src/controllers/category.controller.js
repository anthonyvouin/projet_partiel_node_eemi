import axios from "axios";


// controller pour recuperer toutes les category
export async function getAllCategories(req, res) {
  try {
    const response = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    const categories = response.data;

    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


