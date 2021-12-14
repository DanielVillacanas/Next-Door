const router = require("express").Router();
const { Router } = require("express");
const { isLoggedIn } = require("../../middlewares/isloggedIn");
const Comment = require("../../models/Comment.model");
const Review = require("../../models/Review.model");

router.post("/create-new-review", isLoggedIn, (req, res, next) => {
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

router.delete("/remove/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;
  Review.findByIdAndDelete(id).then((response) => res.json(response));
});

router.get("/", (req, res) => {
  const { id } = req.query;
  const { type } = req.query;
  if (type === "product") {
    Review.find({ product: id })
      .populate("creator")
      .populate({
        path: "comments",
        populate: { path: "creatorUser" },
      })
      .populate({
        path: "comments",
        populate: { path: "creatorSeller" },
      })
      .then((response) => res.json(response));
  } else if (type === "seller") {
    Review.find({ seller: id })
      .populate("creator")
      .populate({
        path: "comments",
        populate: { path: "creatorUser" },
      })
      .populate({
        path: "comments",
        populate: { path: "creatorSeller" },
      })
      .then((response) => res.json(response));
  }
});

router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  Review.find({ creator: id })
    .populate("product")
    .populate("seller")
    .populate("creator")
    .then((response) => res.json(response));
});

router.post("/create-new-comment", (req, res) => {
  let { creator, description, review } = req.body;
  let creatorUser = undefined;
  let creatorSeller = undefined;

  if (req.session.currentUser.role === "User") {
    console.log("USER");
    creatorUser = req.session.currentUser._id;
  } else {
    console.log("SELLER");
    creatorSeller = req.session.currentUser._id;
  }

  let comment = "";
  console.log(req.body);
  Comment.create({ creatorUser, creatorSeller, description, review })
    .then((response) => {
      console.log(response);
      comment = response;
      return Review.findByIdAndUpdate(review, { $push: { comments: response._id } }, { new: true });
    })
    .then((resp) => res.json({ comment: comment, review: resp }))
    .catch((err) => console.log(err));
});

module.exports = router;
