const router = require("express").Router();
const User = require("../../models/User.model");
const Seller = require("../../models/Seller.model");

router.post("/signUp", (req, res, next) => {
  console.log(req.body);
  const { email } = req.body;
  User.findOne({ email }).then((user) => {
    user
      ? res.status(500).send("Error usuario ya registrado")
      : User.create(req.body).then((response) => {
          res.json(response);
        });
  });
});

router.post("/signUpSeller", (req, res, next) => {
  const { email } = req.body;
  Seller.findOne({ email }).then((seller) => {
    seller
      ? res.status(500).send("Error vendedor ya registrado")
      : Seller.create(req.body).then((response) => {
          res.json(response);
        });
  });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  console.log("entra");
  User.findOne({ email }).then((user) => {
    user
      ? password === user.password
        ? res.json(user)
        : res.status(500).send("Error contraseña incorrecta!")
      : Seller.findOne({ email }).then((seller) => {
          seller
            ? password === seller.password
              ? res.json(seller)
              : res.status(500).send("Error contraseña incorrecta!")
            : res.status(500).send("Error usuario no registrado!");
        });
  });
  // .catch(res.status(500).send("Error al loguear usuario!"));
});

// router.get("/isloggedin", (req, res) => {
//   req.session.currentUser
//     ? res.json(req.session.currentUser)
//     : res.status(401).json({ code: 401, message: "Unauthorized" });
// });

module.exports = router;
