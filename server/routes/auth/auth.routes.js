const router = require("express").Router();
const User = require("../../models/User.model");

router.post("/sigup", (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((user) => {
      user
        ? res.status(500).send("Error usuario ya registrado")
        : User.create(req.body).then((response) => res.json(response));
    })
    .catch(res.status(500).send("Error al crear usuario!"));
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
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
