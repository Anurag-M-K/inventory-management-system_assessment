const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  customername: {
    type: String,
    required: true,
  },
  cash: {
    type: Number,
    required: true,
  },
  productname: {
   type:String, // Replace this with the actual name of your inventory item collection
    required: true,
  },
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
