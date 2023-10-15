const { schema } = require('../models/userDb');

const getProducts = async (req, res, next) => {
  try {
    const products = await schema.find();
    res.render("home", { products });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getAddProduct = async (req, res, next) => {
  const products = await schema.find();
  const latestProduct = await schema.findOne().sort({ id: -1 });
  let nextProductId = 1;

  if (latestProduct) {
    nextProductId = latestProduct.id + 1;
  }
  res.render("addProducts", { products, nextProductId });
};

const postAddProduct = async (req, res, next) => {
  try {
    const latestProduct = await schema.findOne().sort({ id: -1 });
    let nextProductId = 1;

    if (latestProduct) {
      nextProductId = latestProduct.id + 1;
    }

    const urlToImage = req.file.originalname;
    const newProduct = {
      id: nextProductId,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: urlToImage,
    };

    await schema.create(newProduct);
    const products = await schema.find();
    res.redirect("/");
  } catch (error) {
    const errorMessage = "Error creating a new product.";
    console.error(error);
    res.status(500).send(errorMessage);
  }
};

const getProductDetails = async (req, res, next) => {
  const products = await schema.find();
  const productId = parseInt(req.params.id);
  const matchingElement = products.find((element) => {
    return element.id === productId;
  });
  if (matchingElement) {
    res.render("productDetails", { matchingElement });
  } else {
    const error = new Error(`Product with ID ${productId} not found`);
    error.statusCode = 404;
    next(error);
  }
};

const getEditProduct = async (req, res, next) => {
  const products = await schema.find();
  res.render("editProducts", { products });
};

const postEditProduct = async (req, res) => {
  const productId = req.params.id;
  let urlToImage = "";

  if (req.file) {
    urlToImage = req.file.originalname;
  }

  const updatedProduct = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: urlToImage,
  };

  try {
    const product = await schema.findOneAndUpdate(
      { id: productId },
      updatedProduct,
      { new: true }
    );

    if (!product) {
      res.json("Product not found");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await schema.findOneAndDelete({ id: productId });

    if (!product) {
      res.json("Product not found");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getProducts,
  getAddProduct,
  postAddProduct,
  getProductDetails,
  getEditProduct,
  postEditProduct,
  deleteProduct,
};
