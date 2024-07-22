const mongoose = require('mongoose');

const industryNewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true, index: true },
  publishedAt: { type: Date, required: true },
  image: { type: String, required: false }, // New field for image
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('IndustryNews', industryNewsSchema);
