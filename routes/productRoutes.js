import express from "express";
import { getProducts, createProduct, updateProduct, deleteProduct, getProductById } from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById); 
router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
