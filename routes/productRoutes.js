import express from "express";
import { getProducts, createProduct } from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", upload.single("image"), createProduct);

export default router;
