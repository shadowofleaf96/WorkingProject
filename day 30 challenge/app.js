const express = require('express');
const path = require('path');
const app = express();

// Define the path to your static files (images)
const staticPath = path.join(__dirname, 'public', 'images');
const cssPath = path.join(__dirname, 'public', 'css');

// Serve static files (images) with caching headers
app.use('/images', express.static(staticPath, {
  maxAge: '1y', // Set the maximum age for caching (1 day in this example)
  etag: false, // Disable ETag for simplicity (you can enable it if needed)
}));

// Serve CSS files with caching headers
app.use('/css', express.static(cssPath, {
  maxAge: '1y', // Set the maximum age for caching (1 day in this example)
  etag: false, // Disable ETag for simplicity (you can enable it if needed)
}));

let products = [
  {
    id: 1,
    name: "iPhone 12 Pro",
    price: 1099.99,
    description: "A high-end smartphone with advanced features.",
    image: "iPhone12pro.png" // The image filename associated with this product
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    price: 999.99,
    description: "A powerful Android smartphone with a stunning display.",
    image: "galaxys21.png" // The image filename associated with this product
  },
  {
    id: 3,
    name: "Sony PlayStation 5",
    price: 499.99,
    description: "Next-gen gaming console with impressive graphics.",
    image: "play5.png" // The image filename associated with this product
  },
  {
    id: 4,
    name: "MacBook Pro 16",
    price: 2399.99,
    description: "A premium laptop for professionals and creatives.",
    image: "macbookpro16.png" // The image filename associated with this product
  },
  {
    id: 5,
    name: "DJI Mavic Air 2",
    price: 799.99,
    description: "A compact drone with high-quality camera capabilities.",
    image: "dji.png" // The image filename associated with this product
  }
];

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.set('view engine', 'ejs');

app.get("/", (req, res, next) => {
  res.render('home', { products: products });  
});

app.get("/products", (req, res, next) => {
  res.render('home', { products: products });  
});

app.get("/products/search", (req, res, next) => {
  const searchQuery = req.query.item;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  let filteredProducts = products;

  if (filteredProducts) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice
    );
  }
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= maxPrice
    );
  }
  res.send(filteredProducts);
});

app.get("/products/:id", (req, res, next) => {
  const productsId = parseInt(req.params.id); // Convert string to integer
  const matchingElement = products.find((element) => {
    return element.id === productsId;
  });
  if (matchingElement) {
    let originalPrice = matchingElement.price;
    let newPrice = originalPrice + (originalPrice * 0.2); // Adding 20% to the original price
    res.render('productDetails', { matchingElement: matchingElement });  
  } else {
    const error = new Error("Getting with id: Product not found");
    error.statusCode = 404;
    next(error);
  }
});

app.post("/products", (req, res, next) => {
  const newProduct = req.body;
  if (!newProduct || !newProduct.name || !newProduct.price) {
    const error = new Error("Invalid product data");
    error.statusCode = 400;
    next(error);
  }
  products.push(newProduct);
  res.send(products);
});

app.put("/products/:id", (req, res, next) => {
  const productId = parseInt(req.params.id); // Convert the ID parameter to an integer.
  const productIndex = products.findIndex(
    (product) => product.id === productId
  );
  if (productIndex === -1) {
    const error = new Error("Editing product: Product not found");
    error.statusCode = 404;
    next(error);
  }
  const updatedProduct = req.body; // Assuming the request body contains the updated product data.
  products[productIndex] = { ...products[productIndex], ...updatedProduct };
  res.send(products[productIndex]);
});

app.delete("/products/:id", (req, res, next) => {
  const productId = parseInt(req.params.id); // Convert the ID parameter to an integer.
  const productIndex = products.findIndex(
    (product) => product.id === productId
  );
  if (productIndex === -1) {
    const error = new Error("Deleting product: Product not found");
    error.statusCode = 404;
    next(error);
  }
  products.splice(productIndex, 1);
  res.send({ message: "Product deleted successfully" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json(message);
});

const server = app.listen(3000, () => {
  console.log("Server is working on http://127.0.0.1:3000");
});