import mongoose from "mongoose";

// un produit
const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    ref: "Product",
    required: true,
  },
  image: { type: String, required: false },
  quantity: { type: Number, required: true },
  price: { type: Number, required: false },
});

// list des produits pour le panier
const orderSchema = new mongoose.Schema({
  products: [productSchema]
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
