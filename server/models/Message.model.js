const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    text: {
      type: String,
    },
    conversationId: { type: Schema.Types.ObjectId, ref: "Conversation" },

    sender: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);

module.exports = Message;
