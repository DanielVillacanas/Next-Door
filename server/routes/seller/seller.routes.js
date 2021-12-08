const router = require("express").Router();
const Product = require("../../models/Product.model");
const Seller = require("../../models/Seller.model");

const testProduct = {
  name: "Manzanas Rojas",
  price: 125,
  owner: "61ae39e49f2242c4b8fdfaf0",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  img_url:
    "https://www.vip.coop/images/content/472343_37260_5_N_350_400_0_5246360/pinova-40x60x10.png",
};

router.post("/createProduct", (req, res, next) => {
  //SUSTITUIR testProduct por req.body
  Product.create(testProduct).then((response) => res.json(response));
  // .catch(res.status(500).send("Error al crear producto"));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Seller.findById(id)
    .populate("products")
    .then((response) => res.json(response));
});

module.exports = router;
