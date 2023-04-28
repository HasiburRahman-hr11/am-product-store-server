const { Schema, model } = require("mongoose");

const chatSchema = new Schema(
  {
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    messages: [
      {
        content: { type: String },
        sender: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ]
  },
  { timestamps: true }
);

const Chat = model("Chat", chatSchema);
module.exports = Chat;
