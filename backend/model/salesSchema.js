const mongoose = require("mongoose");
const { Schema } = mongoose; // Import the Schema object

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
  customerId: {
    type: Schema.Types.ObjectId, // Use the Schema.Types.ObjectId for the field
    ref: "Customer",
    required: true,
  },
  cash: {
    type: Number,
    required: true,
  },
  productname: {
    type: String, // Replace this with the actual name of your inventory item collection
    required: true,
  },
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
