const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    creatorUser: { type: Schema.Types.ObjectId, ref: "User" },
    creatorSeller: { type: Schema.Types.ObjectId, ref: "Seller" },
    description: {
      type: String,
    },
    review: { type: Schema.Types.ObjectId, ref: "Product" },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
