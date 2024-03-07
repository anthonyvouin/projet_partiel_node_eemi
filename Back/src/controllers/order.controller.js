import axios from "axios";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export async function createOrder(req, res) {
  const data = req.body;
  let result = []

  for (const element of data) {
    let product;
    if(Number(element.id)){
      const response = await axios.get(
        `http://localhost:3000/api/product/get-product-by-id/${element.productId}`
      );
      product = response.data;
    }else{
      product = await Product.findById(element.productId);
    }

    console.log(product.image)


    const order = {
      productId: element.id,
      image: product.image, 
      quantity: element.quantity,
      price: product.price * element.quantity, 
    };

    result.push(order)
  };

  const order = new Order({
    products: result
  });


  // try {
    
   

   
    // if (!product) {
      // try {

      // } catch (error) {
      //   console.error(
      //     "Erreur lors de la récupération du produit depuis l'API :",
      //     error
      //   );
      //   return res
      //     .status(404)
      //     .json({
      //       error:
      //         "Le produit n'a pas été trouvé dans la base de données ni sur l'API.",
      //     });
      // }
    // }

    // Si le produit existe, créer la commande


    await order.save();
    

  //   res
  //     .status(201)
  //     .json({ message: "La commande a été créée avec succès.", order });
  // } catch (error) {
  //   console.error("Erreur lors de la création de la commande :", error);
  //   res
  //     .status(500)
  //     .json({ error: "Erreur lors de la création de la commande." });
  // }
}


export default {createOrder};
