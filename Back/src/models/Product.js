// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imagePath: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
