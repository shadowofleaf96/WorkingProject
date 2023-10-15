const express = require("express");
const path = require("path");
const multer = require("multer");
const { schema } = require("./models/userDb");
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination folder for uploaded files
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // Use the original filename
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res, next) => {
  const products = await schema.find();
  res.render("home", { products: products });
});

app.get("/addProduct", async (req, res, next) => {
  const products = await schema.find();
  // Find the latest product in the database and get its ID
  const latestProduct = await schema.findOne().sort({ id: -1 });
  let nextProductId = 1; // Default value if there are no existing products

  if (latestProduct) {
    nextProductId = latestProduct.id + 1;
  }
  res.render("addProducts", { products: products, nextProductId });
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

    const filteredProducts = await schema.find(query);
    res.send(filteredProducts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/products/:id", async (req, res, next) => {
  const products = await schema.find();
  const productsId = parseInt(req.params.id); // Convert string to integer
  const matchingElement = products.find((element) => {
    return element.id === productsId;
  });
  if (matchingElement) {
    res.render("productDetails", { matchingElement: matchingElement });
  } else {
    const error = new Error(`Product with ID ${productsId} not found`);
    error.statusCode = 404;
    next(error);
  }
});

app.post("/addProduct", upload.single("image"), async (req, res, next) => {
  try {
    // Find the latest product in the database and get its ID
    const latestProduct = await schema.findOne().sort({ id: -1 });
    let nextProductId = 1; // Default value if there are no existing products

    if (latestProduct) {
      nextProductId = latestProduct.id + 1;
    }

    const urlToImage = req.file.originalname;
    const newProduct = {
      id: nextProductId, // Set the new product's ID
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: urlToImage,
    };


    // Create and save the new product in the database
    await schema.create(newProduct);
    const products = await schema.find();
    res.redirect("/");
  } catch (error) {
    const errorMessage = "Error creating a new product.";
    console.error(error);
    res.status(500).send(errorMessage);
  }
});

app.get("/editProduct", async (req, res, next) => {
  const products = await schema.find();
  res.render("editProducts", { products: products });
});

// Edit product route
app.post("/editProduct/:id", upload.single("image"), async (req, res) => {
  const productId = req.params.id;
  let urlToImage = "";

  if (req.file) {
    urlToImage = req.file.originalname;
  }

  console.log(urlToImage)
  
  const updatedProduct = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: urlToImage,
  };

  console.log(updatedProduct)

  try {
    const product = await schema.findOneAndUpdate(
      { id: productId },
      updatedProduct,
      { new: true }
    );

    if (!product) {
      res.json("product not found");
    } else {
      // Render the EJS template again with the updated product list
      res.redirect("/");
    }
  } catch (error) {
    // Handle errors
  }
});

// Delete product route
app.post("/deleteProduct/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await schema.findOneAndDelete({ id: productId });

    if (!product) {
      res.json("product not found");
    } else {
      // Render the EJS template again with the updated product list
      res.redirect("/");
    }
  } catch (error) {
    // Handle errors
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
