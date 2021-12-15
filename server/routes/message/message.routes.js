const router = require("express").Router();
const Message = require("../../models/Message.model");

router.post("/new-message", (req, res) => {
  const { text, sender, conversationId } = req.body;
  Message.create({ text, sender, conversationId })
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Message.find({ conversationId: id })
  .then((response) => {
    res.json(response);
  });
});

module.exports = router;
