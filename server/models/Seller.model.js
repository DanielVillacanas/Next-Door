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
    img_url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
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
