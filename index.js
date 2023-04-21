const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const fileUpload = require('express-fileupload');

require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use(fileUpload());

// app.use(multer().any());

// Routes
app.use(userRoute);
app.use(productRoute);



const PORT = process.env.PORT || 8080;
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.exqhipi.mongodb.net/store`)
  .then(() => {
    console.log('Database Connected.')
    app.listen(PORT, () => {
      console.log(`Server is connected at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
