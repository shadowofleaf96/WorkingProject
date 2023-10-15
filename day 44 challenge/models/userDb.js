const Joi = require("joi");
const mongoose = require("mongoose");

// Define Joi schema for product data validation
const productSchema = Joi.object({
  _id: Joi.any().strip(),
  id: Joi.number().integer().positive().required(),
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
});

const pdtsSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    price: Number,
    description: String,
    image: String,
  },
  {
    collection: "productDb",
    versionKey: false,
  }
);

// Add a pre-save hook to validate and sanitize data using Joi
pdtsSchema.pre("save", async function (next) {
  try {
    // Validate data against the Joi schema
    const validatedData = await productSchema.validateAsync(this.toObject());

    // Update the schema fields with validated data
    this.id = validatedData.id;
    this.name = validatedData.name;
    this.price = validatedData.price;
    this.description = validatedData.description;
    this.image = validatedData.image;
    next();
  } catch (error) {
    next(error);
  }
});

const schema = mongoose.model("productDb", pdtsSchema);
if (schema) {
  console.log("database schema created");
} else {
  console.log("error");
}
mongoose.connect("mongodb://127.0.0.1:27017/myDb", { useNewUrlParser: true });

module.exports = {
  mongoose,
  schema,
};
