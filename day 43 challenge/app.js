const express = require("express");
const path = require("path");
const { mongoose, schema } = require("./models/userDb");
const app = express();

let products = "";

// Define the path to your static files (images)
const staticPath = path.join(__dirname, "public", "images");
const cssPath = path.join(__dirname, "public", "css");

// Serve static files (images) with caching headers
app.use(
  "/images",
  express.static(staticPath, {
    maxAge: "1y", // Set the maximum age for caching (1 day in this example)
    etag: true, // Enable ETag for RESTful API
  })
);

// Serve CSS files with caching headers
app.use(
  "/css",
  express.static(cssPath, {
    maxAge: "1y", // Set the maximum age for caching (1 day in this example)
    etag: true, // Enable ETag for RESTful API
  })
);

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.set("view engine", "ejs");

app.get("/", async (req, res, next) => {
  const products = await schema.find()
  res.render("home", { products: products });
});

app.get("/products/search", async (req, res, next) => {
  const searchQuery = req.query.item;
  const minPrice = parseFloat(req.query.minPrice);
  const maxPrice = parseFloat(req.query.maxPrice);

  try {
    let query = {};

    if (searchQuery) {
      query.name = { $regex: new RegExp(searchQuery, "i") };
    }
    console.log(searchQuery);

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

    const filteredProducts = await schema.find(query).toArray();
    res.send(filteredProducts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/products/:id", async (req, res, next) => {
  const products = await schema.find()
  const productsId = parseInt(req.params.id); // Convert string to integer
  const matchingElement = products.find((element) => {
    return element.id === productsId;
  });
  if (matchingElement) {
    let originalPrice = matchingElement.price;
    let newPrice = originalPrice + originalPrice * 0.2; // Adding 20% to the original price
    res.render("productDetails", { matchingElement: matchingElement });
  } else {
    const error = new Error(`Product with ID ${productsId} not found`);
    error.statusCode = 404;
    next(error);
  }
});

app.post("/products", async (req, res, next) => {
  const newProduct = req.body;
  if (!newProduct || !newProduct.name || !newProduct.price || !newProduct.description || !newProduct.image) {
    const error = new Error(
      "Invalid product data. Please provide a valid product name and price."
    );
    error.statusCode = 400;
    next(error);
  }
  const products = await schema
      .create(newProduct)
      res.send(products);
});

// Update a product by custom "id"
app.put('/products/:id', async (req, res, next) => {
  const customProductId = req.params.id;
  const updatedProduct = req.body;

  try {
    const product = await schema.findOneAndUpdate(
      { id: customProductId },
      updatedProduct,
      { new: true }
    );

    if (!product) {
      const error = new Error(`Product with ID ${customProductId} not found. Editing product failed.`);
      error.statusCode = 404;
      throw error;
    }

    res.send(product);
  } catch (err) {
    next(err);
  }
});

app.delete("/products/:id", async (req, res, next) => {
  const productId = parseInt(req.params.id); // Convert the ID parameter to an integer.
  try {
    const product = await schema.findOneAndDelete(
      { id: productId },
    );

    if (!product) {
      const error = new Error(`Product with ID ${customProductId} not found. Editing product failed.`);
      error.statusCode = 404;
      throw error;
    }

    res.send(product);
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json(message);
});

const server = app.listen(3000, () => {
  console.log("Server is working on http://127.0.0.1:3000");
});
