const router = require("express").Router();
const { response } = require("express");
const Product = require("../../models/Product.model");
const User = require("../../models/User.model");
const Seller = require("../../models/Seller.model");

router.get("/cart/add", (req, res) => {
  const id = req.query.id;
  let newquantity = req.query.quantity;
  const user_id = req.session.currentUser._id;

  User.findById(user_id).then((response) => {
    let quantity = 0;
    let position = undefined;
    //Busco si ese producto ya estaba en el carrito,si es asi lo guardo en la variable produc
    for (let i = 0; i < response.productsCart.length; i++) {
      response.productsCart[i].product.toString() === id &&
        ((newquantity =
          parseInt(newquantity) + parseInt(response.productsCart[i].quantity)),
        (position = i));
    }
    position === undefined
      ? (response.productsCart.push({ product: id, quantity: newquantity }),
        User.findByIdAndUpdate(user_id, response, { new: true }).catch((err) =>
          console.log(err)
        ))
      : User.findByIdAndUpdate(
          user_id,
          {
            $set: {
              [`productsCart.${position}.quantity`]: newquantity,
            },
          },
          { new: true }
        ).catch((err) => console.log(err));
  });
});

router.get("/", (req, res, next) => {
  Product.find()
    .populate("owner")
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
});

router.get("/details/:id", (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .populate("owner")
    .then((response) => res.json(response));
});

router.get("/cart/all", (req, res) => {
  const user_id = req.session.currentUser._id;
  User.findById(user_id)
    .populate({
      path: "productsCart.product",
      populate: { path: "owner" },
    })
    .then((response) => {
      res.json(response);
    });
});

router.put("/cart/remove/:id", (req, res) => {
  const { id } = req.params;
  const user_id = req.session.currentUser._id;
  User.findByIdAndUpdate(
    user_id,
    { $pull: { productsCart: { _id: id } } },
    { new: true }
  ).then((response) => res.json(response));
});

router.post("/create-new-product", (req, res, next) => {
  const id = req.session.currentUser._id;
  Product.create(req.body).then((response) => {
    Seller.findByIdAndUpdate(
      id,
      {
        $push: { products: response._id },
      },
      { new: true }
    ).then((response) => {
      res.json(response);
    });
  });
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
