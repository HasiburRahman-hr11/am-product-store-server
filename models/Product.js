const { Schema, model, Types } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: { type: String },
    price: {
      type: Number,
      required: true,
    },
    thumbnail: { type: Buffer },
    addedBy:{ type: String}
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);
module.exports = Product;
