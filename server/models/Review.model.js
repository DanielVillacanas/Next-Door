const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    description: {
      type: String,
      required: true,
    },
    rating: { type: Number, enum: [0, 1, 2, 3, 4, 5], required: true },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
