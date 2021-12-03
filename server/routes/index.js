const router = require("express").Router();

router.get("/allProducts", (req, res, next) => {
  //LLamo a la BBDD y obtengo todos los productos los mando res.JSON
});
router.post(
  "/allProducts/:id",
  /*AQUI IRIA UN MIDDLEWARE*/ (req, res) => {
    //Llamo a la BBDD y lo pusheo a la lista de productos del carrito
  }
);
// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
