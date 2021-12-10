const router = require("express").Router();
const User = require("../../models/User.model");
const Seller = require("../../models/Seller.model");
const { APIMapBox } = require("../../services/APImapBox/mapBoxSerivces");
const { response } = require("express");

let mapAPI = new APIMapBox();

router.post("/signUp", (req, res, next) => {
  let { email, password, address, username } = req.body;
  mapAPI.getCoordinates(address).then((response) => {
    address = response.data.features[0].place_name;
    const coordinates = response.data.features[0].center;
    mapAPI.getMap(coordinates).then((map) => {
      let map_img = map;
      User.findOne({ email })
        .then((user) => {
          user
            ? res.status(500).send("Error usuario ya registrado")
            : User.create({ email, password, address, username, coordinates, map_img }).then(
                (response) => {
                  res.json(response);
                }
              );
        })
        .catch((err) => console.log(err));
    });
  });
});

router.post("/signUpSeller", (req, res, next) => {
  let { email, password, address, username, coordinates, type } = req.body;

  mapAPI.getCoordinates(address).then((response) => {
    address = response.data.features[0].place_name;
    const coordinates = response.data.features[0].center;
    Seller.findOne({ email }).then((seller) => {
      seller
        ? console.log("Vendedor ya registrado")
        : Seller.create({ email, password, address, username, coordinates, type }).then(
            (response) => res.json(response)
          );
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
