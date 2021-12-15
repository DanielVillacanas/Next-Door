const { Schema, model } = require("mongoose");

const conversationSchema = new Schema(
  {
    participants: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Conversation = model("Conversation", conversationSchema);

module.exports = Conversation;
