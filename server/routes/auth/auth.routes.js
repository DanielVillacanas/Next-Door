const router = require("express").Router();
const User = require("../../models/User.model");

router.post("/signup", (req, res, next) => {
  console.log(req.body);
  const { email } = req.body;
  User.findOne({ email }).then((user) => {
    user
      ? res.status(500).send("Error usuario ya registrado")
      : User.create(req.body).then((response) => {
          console.log(response);
          res.json(response);
        });
  });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  console.log("entra");
  User.findOne({ email })
    .then((user) => {
      user
        ? password === user.password
          ? res.json(user)
          : res.status(500).send("Error contraseña incorrecta!")
        : res.status(500).send("Error usuario no registrado");
    })
    .catch(res.status(500).send("Error al loguear usuario!"));
});
module.exports = router;
