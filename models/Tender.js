const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  deadline: { type: Date, required: true },
  budget: { type: Number, required: true },
  status: { type: String, required: true, enum: ['Open', 'Closed', 'Awarded'] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tender', tenderSchema);