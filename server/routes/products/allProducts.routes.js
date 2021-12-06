const router = require("express").Router();
const { response } = require("express");
const Product = require("../../models/Product.model");
const User = require("../../models/User.model");

router.get("/cart/add/:id", (req, res) => {
  // const { id } = req.params;
  // const user_id = req.session.currentUser._id;
  const id = "61ab4fd2fe0752e1ac305afb";
  const user = "61ade814ec0388cc4a9fc775";
  User.findOneAndUpdate(user, { $push: { productsCart: id } }, { new: true })
    .populate("productsCart")
    .then((response) => {
      res.json(response.productsCart);
    });
});

router.get("/", (req, res, next) => {
  Product.find()
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
});

router.get("/details/:id", (req, res) => {
  const { id } = req.params;
  Product.findById(id).then((response) => res.json(response));
});
// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
