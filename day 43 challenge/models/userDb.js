const mongoose = require('mongoose');

const pdtsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  description: String,
  image: String
}, {
  collection: 'productDb',
  versionKey: false // You should be aware of the outcome after set to false

});

const schema = mongoose.model('productDb', pdtsSchema);
if(schema) {
  console.log("database schema created")
} else {
  console.log("error")
}
mongoose.connect('mongodb://127.0.0.1:27017/myDb', { useNewUrlParser: true });


module.exports = {
  mongoose,
  schema
};