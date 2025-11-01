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

    // ✅ Pas besoin de refaire un upload
    const imageUrl = req.file?.path || req.file?.url || null;

    const product = await Product.create({
      id,
      nom,
      prix,
      promo,
      promoPrix,
      categorie,
      date,
      image: imageUrl,
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

// 📦 Mettre à jour un produit
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const product = await Product.findOneAndUpdate(
      { id: id },
      updateData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé ❌" });
    }

    res.status(200).json({
      message: "✅ Produit mis à jour avec succès",
      product,
    });
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({ message: "Erreur de mise à jour du produit", error });
  }
};

// 🔹 Supprimer un produit
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifie si le produit existe
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "❌ Produit introuvable" });
    }

    // Supprime l'image de Cloudinary si elle existe
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`Products/${publicId}`);
      } catch (error) {
        console.warn("⚠️ Erreur suppression image Cloudinary :", error.message);
      }
    }

    // Supprime le produit de la base de données
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "✅ Produit supprimé avec succès" });
  } catch (error) {
    console.error("Erreur suppression produit :", error);
    res.status(500).json({ message: "❌ Erreur serveur", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé ❌" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du chargement du produit ❌" });
  }
};


