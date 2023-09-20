const express = require("express");
const app = express();

let products = [
  { id: 1, name: "iPhone 12 Pro", price: 1099.99 },
  { id: 2, name: "Samsung Galaxy S21", price: 999.99 },
  { id: 3, name: "Sony PlayStation 5", price: 499.99 },
  { id: 4, name: "MacBook Pro 16", price: 2399.99 },
  { id: 5, name: "DJI Mavic Air 2", price: 799.99 },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Main Page");
});

app.get("/products", (req, res, next) => {
  res.send(products);
});

app.get("/products/search", (req, res) => {
  const searchQuery = req.query.item;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  let filteredProducts = products;
  if (filteredProducts) {
    filteredProducts = filteredProducts.filter((product)=>(product.name.toLowerCase().includes(searchQuery.toLowerCase())))
  }
  if(minPrice) {
    filteredProducts = filteredProducts.filter((product)=>(product.price >= minPrice))
  }
  if(maxPrice) {
    filteredProducts = filteredProducts.filter((product)=>(product.price <= maxPrice))
  }

  res.send(filteredProducts);
});

app.get("/products/:id", (req, res, next) => {
  const productsId = parseInt(req.params.id); // Convert string to integer
  const matchingElement = products.find((element) => {
    return element.id === productsId;
  });

  if (matchingElement) {
    res.send(
      "Product Found: " + matchingElement.name + " " + matchingElement.price
    );
  } else {
    res.send("No product found");
  }
});

app.post("/products", (req, res) => {
  const newProduct = req.body;

  if (!newProduct || !newProduct.name || !newProduct.price) {
    return res.status(400).json({ error: "Invalid product data" });
  }

  products.push(newProduct);
  res.send(products);
});

app.put("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id); // Convert the ID parameter to an integer.

  // Find the product with the matching ID.
  const productIndex = products.findIndex(
    (product) => product.id === productId
  );

  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const updatedProduct = req.body; // Assuming the request body contains the updated product data.

  // Update the product in the array.
  products[productIndex] = { ...products[productIndex], ...updatedProduct };

  // Respond with the updated product.
  res.send(products[productIndex]);
});

app.delete("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id); // Convert the ID parameter to an integer.

  const productIndex = products.findIndex(
    (product) => product.id === productId
  );

  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }
  // Remove the product from the array.
  products.splice(productIndex, 1);

  res.send({ message: "Product deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server is working on port 3000");
});
