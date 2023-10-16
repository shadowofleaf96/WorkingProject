const { Schema } = require("../models/userDb");
let products = ""
const searchProducts = async (req, res, next) => {
  const searchQuery = req.query.item;
  const minPrice = parseFloat(req.query.minPrice);
  const maxPrice = parseFloat(req.query.maxPrice);

  console.log(searchQuery);

  try {
    let query = {};

    if (searchQuery) {
      query.name = { $regex: new RegExp(searchQuery, "i") };
    }

    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else {
      if (minPrice) {
        query.price = { $gte: minPrice };
      }
      if (maxPrice) {
        query.price = { $lte: maxPrice };
      }
    }

    products = await Schema.find(query);
    res.render("home", { products: products });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const sortProducts = async (req, res, next) => {

  try {
    const sortOption = req.query.sort;

    const sortCriteria = {};

    if (sortOption === "nameAsc") {
      sortCriteria.name = 1;
    } else if (sortOption === "nameDesc") {
      sortCriteria.name = -1;
    } else if (sortOption === "priceAsc") {
      sortCriteria.price = 1;
    } else if (sortOption === "priceDesc") {
      sortCriteria.price = -1;
    }

    products = await Schema.find({}).sort(sortCriteria);
    res.render("home", { products: products, sortOption });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  searchProducts,
  sortProducts,
};
