const router = require("express").Router();
const { response } = require("express");
const Product = require("../../models/Product.model");
const User = require("../../models/User.model");
const Seller = require("../../models/Seller.model");

router.get("/cart/add", (req, res) => {
  const id = req.query.id;
  let newquantity = parseInt(req.query.quantity);
  const user_id = req.session.currentUser._id;

  User.findById(user_id).then((response) => {
    let positionInCart = -1;
    let cartProducts = response.productsCart;

    positionInCart = cartProducts.findIndex((product) => {
      return product.product == id;
    });

    if (positionInCart === -1) {
      response.productsCart.push({ product: id, quantity: newquantity }),
        User.findByIdAndUpdate(user_id, response, { new: true })
          .then((response) => {
            req.session.currentUser = response;
            return res.json(response);
          })
          .catch((err) => console.log(err));
    } else {
      //Calculate the new quantity of the product
      newquantity += cartProducts[positionInCart].quantity;

      User.findByIdAndUpdate(
        user_id,
        {
          $set: {
            [`productsCart.${positionInCart}.quantity`]: newquantity,
          },
        },
        { new: true }
      )
        .then((response) => {
          req.session.currentUser = response;
          return res.json(response);
        })
        .catch((err) => console.log(err));
    }
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
    })
    .catch((err) => console.log(err));
});

router.put("/cart/remove/:id", (req, res) => {
  const { id } = req.params;
  const user_id = req.session.currentUser._id;
  User.findByIdAndUpdate(user_id, { $pull: { productsCart: { _id: id } } }, { new: true }).then(
    (response) => res.json(response)
  );
});

module.exports = router;
