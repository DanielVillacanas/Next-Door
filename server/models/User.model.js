const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      //unique: true,
      //required: true,
    },
    email: {
      type: String,
      //required: true,
      //unique: true,
    },
    address: { type: String, required: true },
    img_url: {
      type: String,
      default: "/images/Perfil/perfil-photo.png",
    },
    password: {
      type: String,
      required: true,
    },
    productsCart: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    role: {
      type: String,
      default: "User",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
