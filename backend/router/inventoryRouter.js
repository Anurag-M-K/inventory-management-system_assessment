const express = require("express");
const { verifyJWT } = require("../middlewares/authMiddleware");
const { addProduct, getAllInventory, deleteInventory } = require("../controller/inventoryController");
const router = express.Router();

router.post("/addproduct",verifyJWT,addProduct);
router.get("/getallinventory",verifyJWT,getAllInventory);
router.delete("/deleteinventory/:id",verifyJWT, deleteInventory)

module.exports = router;