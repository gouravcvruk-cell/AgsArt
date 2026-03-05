import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct
} from "../controllers/productController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", requireAdmin, createProduct);
router.put("/:id", requireAdmin, updateProduct);
router.delete("/:id", requireAdmin, deleteProduct);

export default router;
