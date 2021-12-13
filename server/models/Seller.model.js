const { Schema, model } = require("mongoose");

const sellerSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
    img_url: { type: String, default: "../public/images" },
    address: { type: String, required: true },
    description: String,
    coordinates: [Number],
    map_img: String,
    type: {
      type: String,
      enum: ["Carnes", "Frutas", "Pescados", "Verduras", "Otro"],
      required: true,
    },
    role: {
      type: String,
      default: "Seller",
    },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

const Seller = model("Seller", sellerSchema);

module.exports = Seller;
