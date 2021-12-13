const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    description: {
      type: String,
      required: true,
    },
    rating: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    seller: { type: Schema.Types.ObjectId, ref: "Seller" },
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
