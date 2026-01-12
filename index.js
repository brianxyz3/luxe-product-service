const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product");
const cors = require("cors");
const catchAsync = require("./utlis/catchAsync.js");
const dbUrl =
  "mongodb+srv://brianchima22_db_user:XoxkZm581v05zbha@cluster0.klnhjhj.mongodb.net/?appName=Cluster0";
const port = 3000;

mongoose.connect(dbUrl);

const db = mongoose.connection;

  db.on("error", console.error.bind(console, "Connection error:"));
  db.once("open", () => {
    console.log("Database Connected");
  });

const app = express();

app.use(cors())
app.use(express.json())

const pageLimit = 9;

app.get("/api/products", async (req, res) => {
  const {page, searchInput, category= "all", type= "all", minPrice = 0, maxPrice= 1000} = req.query;
  let userInput = {};
  if (searchInput) userInput.name = { $regex: searchInput, $options: "i" };

  const skip = (page - 1) * pageLimit;

  const filterQuery = {
    ...userInput,
    category: { $in: [category] },
    type: { $in: [type] },
    price: { $gte: minPrice, $lte: maxPrice },
    units: {$gte: 0},
  };

  const numOfPages = await Product.countDocuments(filterQuery).catch((err) =>
    console.log(err)
  );
  const products = await Product.find(filterQuery).skip(skip).limit(pageLimit).catch((err) => console.log(err));

  const totalPages = Math.ceil(numOfPages / pageLimit);

  return res.json({products, totalPages});
});

app.get("/api/products/:productId", async (req, res) => {
  const {productId} = req.params;
    
  const product = await Product.findById(productId);
  res.json(product);
});

app.get("/health", async (req, res) => {
  console.log("Healthy")
  res.status(200).json()
});

app.listen(port, "0.0.0.0")  