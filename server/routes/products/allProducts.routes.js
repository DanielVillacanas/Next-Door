const router = require("express").Router();
const Product = require("../../models/Product.model");

router.get("/", (req, res, next) => {
  //LLamo a la BBDD y obtengo todos los productos los mando res.JSON
  Product.find()
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
});
router.post(
  "/:id",
  /*AQUI IRIA UN MIDDLEWARE*/ (req, res) => {
    //Llamo a la BBDD y lo pusheo a la lista de productos del carrito
  }
);
// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
