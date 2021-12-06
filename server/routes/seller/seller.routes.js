const router = require("express").Router();
const Product = require("../../models/Product.model");

const testProduct = {
  name: "Xuleton",
  price: 125,
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  img_url:
    "https://www.terravilena.es/wp-content/uploads/2019/11/chulet%C3%B3n-de-vaca-1-y-500-Editar-1.jpg",
};

router.post("/createProduct", (req, res, next) => {
  //SUSTITUIR testProduct por req.body
  Product.create(testProduct).then((response) => res.json(response));
  // .catch(res.status(500).send("Error al crear producto"));
});

module.exports = router;
