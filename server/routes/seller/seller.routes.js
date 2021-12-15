const router = require("express").Router();
const { isLoggedIn } = require("../../middlewares/isloggedIn");
const Product = require("../../models/Product.model");
const Seller = require("../../models/Seller.model");

const { APIMapBox } = require("../../services/APImapBox/mapBoxSerivces");
let mapAPI = new APIMapBox();

router.post("/create-new-product", isLoggedIn, (req, res) => {
  const id = req.session.currentUser._id;
  const { name, price, description, img_url, owner } = req.body;

  Product.create({ name, price, description, img_url, owner }).then((response) => {
    Seller.findByIdAndUpdate(
      id,
      {
        $push: { products: response._id },
      },
      { new: true }
    ).then((response) => {
      res.json(response);
    });
  });
});

router.get("/deleteProduct/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;
  Product.findByIdAndRemove(id)
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
});

router.put("/deleteProductFromSeller/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;
  const seller_id = req.session.currentUser._id;

  Seller.findByIdAndUpdate(seller_id, { $pull: { products: id } }, { new: true })
    .populate("products")
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
});

router.post("/edit", isLoggedIn, (req, res) => {
  let { username, email, password, description, address, img_url } = req.body;

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
      return Seller.findOneAndUpdate(
        { email },
        {
          username,
          email,
          password,
          description,
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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Seller.findById(id)
    .populate("products")
    .then((response) => res.json(response));
});

module.exports = router;
