const express = require("express");
const { verifyJWT } = require("../middlewares/authMiddleware");
const { addCustomer, getAllCustomers ,getCustomerLedger } = require("../controller/customerController");
const router = express.Router();

router.post("/addcustomer",verifyJWT,addCustomer);
router.get("/getallcustomers",verifyJWT,getAllCustomers)
router.get('/customerledger/:id',verifyJWT , getCustomerLedger)

module.exports = router;