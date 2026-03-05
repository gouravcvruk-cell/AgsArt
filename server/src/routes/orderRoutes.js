import { Router } from "express";
import {
  createDirectOrder,
  createRazorpayOrder,
  getOrders,
  verifyRazorpayPayment
} from "../controllers/orderController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/create-razorpay-order", createRazorpayOrder);
router.post("/verify-payment", verifyRazorpayPayment);
router.post("/create-direct-order", createDirectOrder);
router.get("/", requireAdmin, getOrders);

export default router;
