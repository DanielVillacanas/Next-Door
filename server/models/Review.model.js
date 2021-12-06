const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const reviewSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    description: {
      type: String,
      required: true,
    },
    rating: { type: Number, enum: [0, 1, 2, 3, 4], required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    seller: { type: Schema.Types.ObjectId, ref: "Seller" },
    type: {
      type: String,
      enum: ["PRODUCT", "SELLER"],
      default: "PRODUCT",
    },
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
