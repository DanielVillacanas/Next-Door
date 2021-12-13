const router = require("express").Router();
const User = require("../../models/User.model");
const Seller = require("../../models/Seller.model");
const { APIMapBox } = require("../../services/APImapBox/mapBoxSerivces");
let mapAPI = new APIMapBox();

router.post("/signUp", (req, res, next) => {
  let { email, password, address, username } = req.body;
  let map_img = "";
  let coordinates = [];

  mapAPI
    .getCoordinates(address)
    .then((response) => {
      address = response.data.features[0].place_name;
      coordinates = response.data.features[0].center;
      return mapAPI.getMap(coordinates);
    })
    .then((map) => {
      map_img = map.request._redirectable._currentUrl;
      return User.findOne({ email });
    })
    .then((user) => {
      user
        ? res.status(500).send("Error usuario ya registrado")
        : User.create({ email, password, address, username, coordinates, map_img }).then(
            (response) => {
              return res.json(response);
            }
          );
    })
    .catch((err) => console.log(err));
});

router.post("/signUpSeller", (req, res, next) => {
  let { email, password, address, username, type } = req.body;
  let map_img = "";
  let coordinates = [];
  mapAPI
    .getCoordinates(address)
    .then((response) => {
      address = response.data.features[0].place_name;
      coordinates = response.data.features[0].center;
      return mapAPI.getMap(coordinates);
    })
    .then((mapSeller) => {
      map_img = mapSeller.request._redirectable._currentUrl;
      return Seller.findOne({ email });
    })
    .then((seller) => {
      seller
        ? console.log("Vendedor ya registrado")
        : Seller.create({ email, password, address, username, coordinates, type, map_img }).then(
            (response) => res.json(response)
          );
    });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .populate("productsCart.product")
    .then((user) => {
      if (user) {
        password === user.password //Validate password
          ? ((req.session.currentUser = user), res.json({ user: user, type: "user" }))
          : res.status(500).send("Error contraseña incorrecta!");
      } else {
        Seller.findOne({ email }).then((seller) => {
          seller
            ? password === seller.password //Validate password
              ? ((req.session.currentUser = seller), res.json({ user: seller, type: "seller" }))
              : res.status(500).send("Error contraseña incorrecta!")
            : res.status(500).send("Error usuario no registrado!");
        });
      }
    })
    .catch((err) => res.status(500).send("Error contraseña incorrecta!"));
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
  req.session.destroy((err) => res.status(200).json({ code: 200, message: "Logout successful" }));
});

module.exports = router;
