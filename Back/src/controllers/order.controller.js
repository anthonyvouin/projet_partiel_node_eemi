import axios from "axios";
import Order from "../models/Order.js";
import Product from "../models/Product.js";


// Controller pour create Order
export async function createOrder(req, res) {
  const data = req.body;
  let result = [];

  for (const element of data) {
    let product;
    
    if(Number(element.productId)){
      const response = await axios.get(`http://localhost:3000/api/product/get-product-by-id/${element.productId}`);
      product = response.data;
    }else{
      product = await Product.findById(element.productId);
      
    }

    if(product){
      result.push( {
        productId: element.productId,
        image: product.image, 
        quantity: element.quantity,
        price: product.price * element.quantity, 
      })
    }

  }

  const order = new Order({
    products: result
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

// Controller get all order
export async function getAllOrders(req, res) {
  try {
    const orders = await Order.find();
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des commandes." });
  }
}


export default {createOrder, getAllOrders};
