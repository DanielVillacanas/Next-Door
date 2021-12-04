const router = require("express").Router();
const Product = require("../../models/Product.model");

const testProduct = {
  name: "Pepinos",
  price: 26,
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  img_url: "test",
};

router.post("/createProduct", (req, res, next) => {
  Product.create(req.body)
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
});

module.exports = router;
