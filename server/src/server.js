import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { ensureDefaultAdmin } from "./controllers/authController.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const paymentMode = (process.env.PAYMENT_MODE || "direct").toLowerCase();
if (!["direct", "razorpay"].includes(paymentMode)) {
  console.error("PAYMENT_MODE must be either 'direct' or 'razorpay'");
  process.exit(1);
}

const requiredEnv = ["MONGODB_URI", "JWT_SECRET"];
if (paymentMode === "razorpay") {
  requiredEnv.push("RAZORPAY_KEY_ID", "RAZORPAY_KEY_SECRET");
}
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length) {
  console.error(`Missing required env variables: ${missingEnv.join(", ")}`);
  process.exit(1);
}

const start = async () => {
  try {
    await connectDB();
    await ensureDefaultAdmin();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

start();
