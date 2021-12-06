const router = require("express").Router();
const Product = require("../../models/Product.model");
const User = require("../../models/User.model");
router.get("/", (req, res, next) => {
  Product.find()
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
});
router.put(
  "/allProducts/cart/add/:id",
  /*AQUI IRIA UN MIDDLEWARE*/ (req, res) => {
    const { id } = req.params;
    const user = req.session.currentUser;
    User.findOneAndUpdate(user._id, { $push: { productsCart: id } }).then((response) =>
      res.json(response)
    );
  }
);
router.get(
  "/details/:id",
  /*AQUI IRIA UN MIDDLEWARE*/ (req, res) => {
    //Llamo a la BBDD y lo pusheo a la lista de productos del carrito
  }
);
// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

router.get();
module.exports = router;
