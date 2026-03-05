import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "auraart/products" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await streamUpload();
    return res.json({ url: result.secure_url, publicId: result.public_id });
  } catch (error) {
    return res.status(500).json({ message: "Upload failed", error: error.message });
  }
};
