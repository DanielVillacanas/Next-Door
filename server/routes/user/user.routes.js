const User = require("../../models/User.model");
const router = require("express").Router();
const { APIMapBox } = require("../../services/APImapBox/mapBoxSerivces");
let mapAPI = new APIMapBox();

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
      return User.findOneAndUpdate(
        { email },
        { username, email, password, address, img_url, coordinates, map_img },
        { new: true }
      );
    })
    .then((response) => {
      console.log(response);
      req.session.currentUser = response;
      return res.json(response);
    });
});

module.exports = router;
