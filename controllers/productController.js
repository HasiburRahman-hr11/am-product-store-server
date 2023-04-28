const Product = require("../models/Product");

// Add new Product
exports.addNewProduct = async (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const user = req.body.user;
  let productData = {
    title: title,
    price: price,
    user: user,
  };
  if (req?.body?.description) {
    productData.description = req?.body?.description;
  }
  if (req?.files?.thumbnail) {
    const thumbnailData = req.files.thumbnail.data;
    const encodedThumbnail = thumbnailData.toString("base64");
    const thumbnail = Buffer.from(encodedThumbnail, "base64");

    productData.thumbnail = thumbnail;
  }

  try {
    const newProduct = new Product(productData);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).populate({
      path: "user",
      select: "firstName lastName email",
    });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Get Single Product
exports.getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product) {
      res.status(200).json(product);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Update Product
exports.editProduct = async (req, res) => {
  const { id } = req.params;
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  let productData = {
    title: title,
    price: price,
  };
  if (req?.body?.description) {
    productData.description = req?.body?.description;
  }
  if (req?.files?.thumbnail) {
    const thumbnailData = req.files.thumbnail.data;
    const encodedThumbnail = thumbnailData.toString("base64");
    const thumbnail = Buffer.from(encodedThumbnail, "base64");

    productData.thumbnail = thumbnail;
  }
  try {
    const product = await Product.findById(id);
    if (product) {
      await Product.findByIdAndUpdate(id, productData, {
        new: true,
      });
      const products = await Product.find().sort({ createdAt: -1 });
      res.status(201).json(products);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product) {
      await Product.findByIdAndDelete(id);
      res.status(200).json(product);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
