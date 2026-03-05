import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const ensureDefaultAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.warn("Default admin not created. Set ADMIN_EMAIL and ADMIN_PASSWORD in .env");
    return;
  }

  const existing = await Admin.findOne({ email });
  if (existing) {
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await Admin.create({ email, passwordHash });
  console.log(`Created default admin: ${email}`);
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id.toString(), email: admin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ token, admin: { email: admin.email } });
  } catch (error) {
    return res.status(500).json({ message: "Failed to login", error: error.message });
  }
};
