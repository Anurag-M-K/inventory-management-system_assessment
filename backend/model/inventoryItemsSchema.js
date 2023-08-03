const mongoose = require("mongoose");

const inventoryItemSchema = new mongoose.Schema(
  {
    productname: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);
module.exports = InventoryItem;
