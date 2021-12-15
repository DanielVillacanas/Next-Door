const router = require("express").Router();
const Conversation = require("../../models/Conversation.model");

router.post("/", (req, res) => {
  let data = { participants: [req.query.senderId, req.query.receiverId] };
  Conversation.create(data).then((response) => {
    res.json(response);
  });
});

router.get("/:id", (req, res) => {
  let { id } = req.params;
  Conversation.find({ participants: { $in: [id] } }).then((response) => res.json(response));
});

router.get("/findConversation/:id", (req, res) => {
  let { id } = req.params;
  let user_id = req.session.currentUser._id;
  console.log(id, user_id);
  Conversation.find({ participants: { $all: [id, user_id] } }).then((response) => {
    return res.json(response);
  });
});

module.exports = router;
