import Product from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";

// ➕ Ajouter un produit
export const createProduct = async (req, res) => {
  try {
    const {
      id,
      nom,
      prix,
      promo,
      promoPrix,
      categorie,
      date,
      description,
      sku,
      ventes,
    } = req.body;

    // 📸 Upload de l'image sur Cloudinary
    const imageResult = req.file ? req.file.path : null;

    const product = await Product.create({
      id,
      nom,
      prix,
      promo,
      promoPrix,
      categorie,
      date,
      image: imageResult,
      description,
      sku,
      ventes,
    });

    res.status(201).json({
      message: "✅ Produit ajouté avec succès",
      product,
    });
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({
      message: "❌ Erreur d’ajout du produit",
      error: error.message,
      stack: error.stack,
    });
  }
};

// 📋 Obtenir tous les produits
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
