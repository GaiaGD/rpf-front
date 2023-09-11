import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Corrected type definition
  properties: { type: Object }
  }, {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;