const { MongoClient } = require("mongodb");

// Connection URL and database name
const url = "mongodb://127.0.0.1:27017"; // MongoDB default URL
const dbName = "myDb"; // Your database name

// Create a new MongoClient
const client = new MongoClient(url);
let db = null;

async function connectToMongo() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

async function getProducts() {
  if (!db) {
    throw new Error("Database connection not established.");
  }
  const products = await db.collection("productDb").find().toArray();
  return products;
}

module.exports = {
  connectToMongo,
  getProducts,
};