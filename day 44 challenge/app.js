const express = require("express");
const path = require("path");
const multer = require("multer");
const { schema } = require("./models/userDb");
const app = express();

// Define the path to your static files (images)
const staticPath = path.join(__dirname, "public", "images");
const cssPath = path.join(__dirname, "public", "css");

// Serve static files (images) with caching headers
app.use(
  "/images",
  express.static(staticPath, {
    maxAge: "1y",
    etag: true,
  })
);

// Serve CSS files with caching headers
app.use(
  "/css",
  express.static(cssPath, {
    maxAge: "1y",
    etag: true,
  })
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const productsController = require("./controllers/productsController");
const searchSortController = require("./controllers/searchSortController");

app.get("/", productsController.getProducts);
app.get("/addProduct", productsController.getAddProduct);
app.post("/addProduct", upload.single("image"), productsController.postAddProduct);
app.get("/products/:id", productsController.getProductDetails);

app.get("/editProduct", productsController.getEditProduct);
app.post("/editProduct/:id", upload.single("image"), productsController.postEditProduct);
app.post("/deleteProduct/:id", productsController.deleteProduct);

app.get("/search", searchSortController.searchProducts);
app.get("/sort", searchSortController.sortProducts);

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json(message);
});

const server = app.listen(3000, () => {
  console.log("Server is working on http://127.0.0.1:3000");
});
