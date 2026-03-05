import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Product from "../models/Product.js";

dotenv.config();

const sampleProducts = [
  {
    name: "Blush Bloom Resin Tray",
    description: "Hand-poured resin serving tray with embedded dried petals and rose gold edge finish.",
    price: 2499,
    category: "resin-art",
    images: ["https://images.unsplash.com/photo-1616628182509-6f97323d0f7b?auto=format&fit=crop&w=900&q=80"],
    material: "Premium Epoxy Resin",
    stock: 12
  },
  {
    name: "Ivory Ocean Geode Wall Art",
    description: "Statement wall piece with layered ivory swirls, champagne crystals, and metallic geode accents.",
    price: 4899,
    category: "resin-art",
    images: ["https://images.unsplash.com/photo-1577083288073-40892c0860a4?auto=format&fit=crop&w=900&q=80"],
    material: "Epoxy Resin + Mineral Crystals",
    stock: 6
  },
  {
    name: "Moonlit Resin Hoop Earrings",
    description: "Lightweight resin hoops with suspended shimmer flakes for a delicate evening look.",
    price: 899,
    category: "resin-jewellery",
    images: ["https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80"],
    material: "UV Resin + Stainless Steel Hooks",
    stock: 30
  },
  {
    name: "Petal Drop Resin Pendant",
    description: "Minimal pendant featuring preserved petals in clear resin with soft-gold chain.",
    price: 1199,
    category: "resin-jewellery",
    images: ["https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80"],
    material: "Resin + Alloy Chain",
    stock: 24
  },
  {
    name: "Regal Floral Choker Set",
    description: "Artificial gold choker set inspired by traditional motifs with premium anti-tarnish polish.",
    price: 1899,
    category: "artificial-gold",
    images: ["https://images.unsplash.com/photo-1620656798579-1984d6f58936?auto=format&fit=crop&w=900&q=80"],
    material: "Brass Alloy with Gold Plating",
    stock: 18
  },
  {
    name: "Auric Temple Jhumka",
    description: "Handcrafted duplicate gold jhumka with carved detailing and pearl-inspired bead drops.",
    price: 1499,
    category: "artificial-gold",
    images: ["https://images.unsplash.com/photo-1635767798638-3665c3f9f72f?auto=format&fit=crop&w=900&q=80"],
    material: "Alloy + Gold Tone Finish",
    stock: 22
  }
];

const seed = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    await mongoose.connection.close();
  }
};

seed();
