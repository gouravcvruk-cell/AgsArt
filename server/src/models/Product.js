import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ["resin-art", "resin-jewellery", "artificial-gold"]
    },
    images: [{ type: String, required: true }],
    material: { type: String, default: "Handmade Resin" },
    stock: { type: Number, default: 0, min: 0 },
    sizes: [{ type: String }]
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default mongoose.model("Product", productSchema);
