import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true }, // identifiant unique (si tu veux gérer toi-même)
    nom: { type: String, required: true },
    prix: { type: Number, required: true },
    promo: { type: Boolean, default: false },
    promoPrix: { type: Number, default: null },
    categorie: { type: String, required: true },
    date: { type: Date, default: Date.now },
    image: { type: String, required: true },
    description: { type: String, required: true },
    sku: { type: String, required: true, unique: true }, // référence produit
    ventes: { type: Number, default: 0 }, // nombre de ventes
  },
  { timestamps: true } // ajoute createdAt et updatedAt automatiquement
);

export default mongoose.model("Product", productSchema);
