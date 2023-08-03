const express = require("express");
const { verifyJWT } = require("../middlewares/authMiddleware");
const { addProduct, getAllInventory } = require("../controller/inventoryController");
const router = express.Router();

router.post("/addproduct",verifyJWT,addProduct)
router.get("/getallinventory",verifyJWT,getAllInventory)

module.exports = router;