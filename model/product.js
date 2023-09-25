const { number } = require('joi');
const mongoose = require('mongoose');



const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDiscription: {
    type: String,
    required: true
  },
  productImage: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true

  }
}, { timestamps: true });

module.exports = mongoose.model('product', productSchema)

