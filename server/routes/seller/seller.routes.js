const router = require("express").Router();
const Product = require("../../models/Product.model");
const Seller = require("../../models/Seller.model");
const User = require("../../models/User.model");

router.post("/create-new-product", (req, res, next) => {
  const id = req.session.currentUser._id;
  const { name, price, description, img_url, owner } = req.body;
  Product.create(name, price, description, img_url, owner).then((response) => {
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

router.get("/deleteProduct/:id", (req, res, next) => {
  const { id } = req.params;
  Product.findByIdAndRemove(id)
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
});

router.put("/deleteProductFromSeller/:id", (req, res, next) => {
  const { id } = req.params;
  const seller_id = req.session.currentUser._id;

  Seller.findByIdAndUpdate(seller_id, { $pull: { products: id } }, { new: true })
    .populate("products")
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Seller.findById(id)
    .populate("products")
    .then((response) => res.json(response));
});

module.exports = router;
