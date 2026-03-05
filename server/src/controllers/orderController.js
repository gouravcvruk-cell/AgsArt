import crypto from "crypto";
import { getRazorpayClient } from "../config/razorpay.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

const getPaymentMode = () => (process.env.PAYMENT_MODE || "direct").toLowerCase();

const calculateCart = async (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Cart items are required");
  }

  const ids = items.map((item) => item.productId);
  const products = await Product.find({ _id: { $in: ids } });

  let totalAmount = 0;
  const normalizedItems = items.map((item) => {
    const product = products.find((p) => p._id.toString() === item.productId);
    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }
    const quantity = Number(item.quantity) || 1;
    totalAmount += product.price * quantity;
    return {
      product: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0] || ""
    };
  });

  return { totalAmount, normalizedItems };
};

export const createRazorpayOrder = async (req, res) => {
  try {
    if (getPaymentMode() !== "razorpay") {
      return res.status(400).json({ message: "Razorpay mode is disabled" });
    }

    const { items } = req.body;
    const { totalAmount } = await calculateCart(items);
    const razorpay = getRazorpayClient();

    const order = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: `auraart_${Date.now()}`
    });

    return res.json(order);
  } catch (error) {
    return res.status(400).json({ message: "Failed to create Razorpay order", error: error.message });
  }
};

export const createDirectOrder = async (req, res) => {
  try {
    if (getPaymentMode() !== "direct") {
      return res.status(400).json({ message: "Direct order mode is disabled" });
    }

    const { customerName, email, phone, address, items } = req.body;
    if (!customerName || !email || !phone || !address) {
      return res.status(400).json({ message: "Missing customer details" });
    }

    const { totalAmount, normalizedItems } = await calculateCart(items);
    const order = await Order.create({
      customerName,
      email,
      phone,
      address,
      items: normalizedItems,
      totalAmount,
      razorpayOrderId: "bypass",
      razorpayPaymentId: `bypass_${Date.now()}`,
      status: "paid"
    });

    return res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id.toString()
    });
  } catch (error) {
    return res.status(400).json({ message: "Failed to place order", error: error.message });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  try {
    if (getPaymentMode() !== "razorpay") {
      return res.status(400).json({ message: "Razorpay mode is disabled" });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerName,
      email,
      phone,
      address,
      items
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !customerName ||
      !email ||
      !phone ||
      !address
    ) {
      return res.status(400).json({ message: "Missing required payment fields" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment signature mismatch" });
    }

    const existingOrder = await Order.findOne({ razorpayPaymentId: razorpay_payment_id });
    if (existingOrder) {
      return res.json({
        message: "Payment already verified",
        orderId: existingOrder._id.toString()
      });
    }

    const { totalAmount, normalizedItems } = await calculateCart(items);
    const order = await Order.create({
      customerName,
      email,
      phone,
      address,
      items: normalizedItems,
      totalAmount,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      status: "paid"
    });

    return res.json({ message: "Payment verified", orderId: order._id.toString() });
  } catch (error) {
    return res.status(400).json({ message: "Payment verification failed", error: error.message });
  }
};

export const getOrders = async (_req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};
