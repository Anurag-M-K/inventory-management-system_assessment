const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  quantity: { type: Number, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem' },
  paymentType: { type: String, enum: ['Cash', 'Credit'], default: 'Cash' },
});

const Sales = mongoose.model('Sales', salesSchema);
module.exports = Sales;
