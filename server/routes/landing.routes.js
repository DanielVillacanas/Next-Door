const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("hola");
});

module.exports = router;
