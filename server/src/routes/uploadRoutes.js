import { Router } from "express";
import multer from "multer";
import { uploadImage } from "../controllers/uploadController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/image", requireAdmin, upload.single("image"), uploadImage);

export default router;
