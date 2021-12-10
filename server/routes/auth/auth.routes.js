const router = require("express").Router();
const User = require("../../models/User.model");
const Seller = require("../../models/Seller.model");

router.post("/signUp", (req, res, next) => {
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
  User.findOne({ email })
    .populate("productsCart.product")
    .then((user) => {
      user
        ? password === user.password //Validate password
          ? ((req.session.currentUser = user),
            console.log(user),
            res.json({ user: user, type: "user" }))
          : res.status(500).send("Error contraseña incorrecta!")
        : Seller.findOne({ email }).then((seller) => {
            seller
              ? password === seller.password //Validate password
                ? ((req.session.currentUser = seller),
                  res.json({ user: seller, type: "seller" }))
                : res.status(500).send("Error contraseña incorrecta!")
              : res.status(500).send("Error usuario no registrado!");
          });
    })
    .catch((err) => console.log(err));
});

router.get("/isloggedin", (req, res) => {
  User.findOne({ id: req.session.currentUser._id })
    .populate("productsCart.product")
    .then((user) => {
      req.session.currentUser
        ? res.json(user)
        : res.status(401).json({ code: 401, message: "Unauthorized" });
    })
    .catch((err) => console.log(err));
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) =>
    res.status(200).json({ code: 200, message: "Logout successful" })
  );
});

module.exports = router;
