const router = require("express").Router();
const User = require("../../models/User.model");
const Seller = require("../../models/Seller.model");
const { APIMapBox } = require("../../services/APImapBox/mapBoxSerivces");
const mapAPI = new APIMapBox();
const bcrypt = require("bcrypt");

router.post("/signUp", (req, res) => {
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
      const bcryptSalt = 10;
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      user
        ? res.status(500).send("Error usuario ya registrado")
        : User.create({
            email,
            password: hashPass,
            address,
            username,
            coordinates,
            map_img,
          }).then((response) => {
            req.session.currentUser = response;
            return res.json(response);
          });
      // .catch((err) => console.log(err));
    })
    .catch((err) => res.status(500).send(err));
});

router.post("/signUpSeller", (req, res) => {
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
      const bcryptSalt = 10;
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      seller
        ? console.log("Vendedor ya registrado")
        : Seller.create({
            email,
            password: hashPass,
            address,
            username,
            coordinates,
            type,
            map_img,
          })
            .then((response) => {
              console.log(response);
              req.session.currentUser = response;
              return res.json(response);
            })
            .catch((err) => console.log("Error al crear Vendedor"));
    })
    .catch((err) => res.status(500).send(err));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  User.findOne({ email })
    .populate("productsCart.product")
    .then((user) => {
      if (user) {
        bcrypt.compareSync(password, user.password) //Validate password
          ? ((req.session.currentUser = user), res.json({ user: user, type: "user" }))
          : res.status(500).send("Error contraseña incorrecta!");
      } else {
        console.log("Seller");
        Seller.findOne({ email }).then((seller) => {
          seller
            ? bcrypt.compareSync(password, seller.password) //Validate password
              ? ((req.session.currentUser = seller), res.json({ user: seller, type: "seller" }))
              : res.status(500).send("Error contraseña incorrecta!")
            : res.status(500).send("Error usuario no registrado!");
        });
      }
    })
    .catch((err) => res.status(500).send("Error contraseña incorrecta!"));
});

router.get("/isloggedin", (req, res) => {
  const _id = req.session.currentUser._id;
  const role = req.session.currentUser.role;
  console.log("LA ID es", _id);
  if (_id) {
    if (role === "User") {
      User.findById(_id)
        .populate("productsCart.product")
        .then((user) => {
          req.session.currentUser
            ? res.json(user)
            : res.status(401).json({ code: 401, message: "Unauthorized" });
        })
        .catch((err) => console.log(err));
    } else if (role === "Seller") {
      Seller.findById(_id)
        .then((user) => {
          req.session.currentUser
            ? res.json(user)
            : res.status(401).json({ code: 401, message: "Unauthorized" });
        })
        .catch((err) => console.log(err));
    }
  } else {
    res.status(400).json({ code: 400, message: "Not Logged user" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => res.status(200).json({ code: 200, message: "Logout successful" }));
});

module.exports = router;
