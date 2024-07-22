// Tool.js
const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  supplier: { type: String, required: true, index: true },
  image: { type: String }, // Add image field
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tool', toolSchema);
