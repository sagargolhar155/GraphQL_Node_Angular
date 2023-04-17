const { model, Schema } = require('mongoose');

const customerSchema = new Schema({
  name: String,
  email: String,
  createAt: String,
  products: [{
    name: String,
    description: String,
    createAt: String,
    price: Number,
    quantity: Number,
  }],
});

module.exports = model('Customer', customerSchema);
