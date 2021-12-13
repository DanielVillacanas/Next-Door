const router = require("express").Router();
const { Router } = require("express");
const Review = require("../../models/Review.model");

router.post("/create-new-review", (req, res, next) => {
  const id = req.session.currentUser._id;
  const data = {
    creator: id,
    description: req.body.description,
    rating: req.body.rating,
    product: req.body.product,
    seller: req.body.seller,
  };
  Review.create(data).then((response) => {
    res.json(response);
  });
});

router.delete("/remove/:id", (req, res) => {
  const { id } = req.params;
  Review.findByIdAndDelete(id).then((response) => res.json(response));
});

router.get("/", (req, res) => {
  const { id } = req.query;
  const { type } = req.query;
  if (type === "product") {
    Review.find({ product: id })
      .populate("creator")
      .then((response) => res.json(response));
  } else if (type === "seller") {
    Review.find({ seller: id })
      .populate("creator")
      .then((response) => res.json(response));
  }
});

router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  Review.find({ owner: id })
    .populate("product")
    .populate("creator")
    .then((response) => res.json(response));
});

module.exports = router;
