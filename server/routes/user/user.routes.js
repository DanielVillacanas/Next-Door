const User = require("../../models/User.model");
const router = require("express").Router();
const { APIMapBox } = require("../../services/APImapBox/mapBoxSerivces");
const mapAPI = new APIMapBox();
const bcrypt = require("bcrypt");
const { isLoggedIn } = require("../../middlewares/isloggedIn");

router.post("/edit", isLoggedIn, (req, res) => {
  let { username, email, password, address, img_url } = req.body;

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

      const bcryptSalt = 10;
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      return User.findOneAndUpdate(
        { email },
        {
          username,
          email,
          password: hashPass,
          address,
          img_url,
          coordinates,
          map_img,
        },
        { new: true }
      );
    })
    .then((response) => {
      req.session.currentUser = response;
      return res.json(response);
    });
});

router.get("/user/:id", (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
});

module.exports = router;
