const User = require("../../models/User.model");

const router = require("express").Router();

router.get("/getCart", (req, res) => {
  //PILLO LA ID DE USUARIO
  const { id } = req.params;
  //BUSCO AL USER y POPULO EL CARRITO DE PRODUCTOS
  User.findById(id)
    .populate({
      path: "productsCart",
      populate: {
        path: "owner",
      },
    })
    .then((response) => console.log(response));
});
router.post("/edit", (req, res) => {
  const { username, email, password, address, img_url } = req.body;
  const id = req.session.currentUser._id;

  User.findByIdAndUpdate(id, { username, email, password, address, img_url })
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
