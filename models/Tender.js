const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  deadline: { type: Date, required: true },
  budget: { type: Number, required: true },
  status: { type: String, required: true, enum: ['Open', 'Closed', 'Awarded'] },
  createdBy: { type: String, required: true, index: true },
  image: { type: String, required: true }, // Add image field
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tender', tenderSchema);
