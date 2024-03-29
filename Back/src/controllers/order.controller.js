import axios from "axios";
import Order from "../models/Order.js";
import Product from "../models/Product.js";


// Controller pour create Order
export async function createOrder(req, res) {
  const data = req.body;
  let result = [];

  for (const element of data) {
    let product;

    if (Number(element.productId)) {
      const response = await axios.get(
        `http://localhost:3000/api/product/get-product-by-id/${element.productId}`
      );
      product = response.data;
    } else {
      product = await Product.findById(element.productId);
    }

    // Si le produit est trouvé, ajout des détails de commande
    if (product) {
      result.push({
        productId: element.productId,
        image: product.image,
        quantity: element.quantity,
        price: product.price * element.quantity,
      });
    }
  }

  // Création d'une nouvelle commande avec les détails de commande obtenus
  const order = new Order({
    products: result,
  });

  try {
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

// Controller get all order depuis la db
export async function getAllOrders(req, res) {
  try {
    const orders = await Order.find();

    for (const order of orders) {
      let total = 0;

      for (const item of order.products) {
        let response;
        if(!Number(item.productId)){
          response = await axios.get(
            `http://localhost:3000/api/product/products-by-id/${item.productId}`
          );
        }else{
          response = await axios.get(
            `http://localhost:3000/api/product/get-product-by-id/${item.productId}`
          );
         
        }
        const productDB = response.data
        item.image = productDB.image;
        item.price = productDB.price;
        item.title = productDB.title;
        total += item.price * item.quantity;
      }
      order.total = total;
    }


    res.status(200).json(orders);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des commandes." });
  }
}
