import Product from "../models/Product.js";

const buildFilter = (query) => {
  const filter = {};
  if (query.category) {
    filter.category = query.category;
  }
  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }
  return filter;
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find(buildFilter(req.query)).sort({ createdAt: -1 });
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch product", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const payload = req.body;
    const product = await Product.create(payload);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({ message: "Failed to create product", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (error) {
    return res.status(400).json({ message: "Failed to update product", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({ message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};
