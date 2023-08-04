const express = require("express");
const { verifyJWT } = require("../middlewares/authMiddleware");
const { addCustomer, getAllCustomers } = require("../controller/customerController");
const router = express.Router();

router.post("/addcustomer",verifyJWT,addCustomer);
router.get("/getallcustomers",verifyJWT,getAllCustomers)


module.exports = router;