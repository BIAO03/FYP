const mongoose = require('mongoose');

const ClothingSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: String,
  price: Number
});

module.exports = mongoose.model('Clothing', ClothingSchema);
