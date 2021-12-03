const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const sellerSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: String, required: true },
    img_url: { type: String, default: "../public/images" },
    adress: { type: String, required: true },
    coordinates: [Number],
    type: {
      type: [String],
      enum: ["Carnes", "Frutas", "Pescados", "Verduras"],
      required: true,
    },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Seller = model("Seller", sellerSchema);

module.exports = Seller;
