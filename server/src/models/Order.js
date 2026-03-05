import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    razorpayOrderId: { type: String, required: true, index: true },
    razorpayPaymentId: { type: String, required: true, unique: true, index: true },
    status: { type: String, enum: ["paid", "failed"], default: "paid" }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default mongoose.model("Order", orderSchema);
