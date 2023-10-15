const { schema } = require("../models/userDb");

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

    const filteredProducts = await schema.find(query);
    res.render("home", { products: filteredProducts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const sortProducts = async (req, res, next) => {
  const sortOption = req.query.sort;

  try {
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

    const sortedProducts = await schema.find({}).sort(sortCriteria);

    res.render("home", { products: sortedProducts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  searchProducts,
  sortProducts,
};
