const User = require("../../models/User.model");

const router = require("express").Router();

router.get("/getCart", (req, res) => {
  //PILLO LA ID DE USUARIO
  const { id } = req.params;
  //BUSCO AL USER y POPULO EL CARRITO DE PRODUCTOS
  User.findById(id).populate({
    path: "productsCart",
    populate: {
      path: "owner",
    },
  });
  //.then((response) => console.log(response));
});

module.exports = router;
