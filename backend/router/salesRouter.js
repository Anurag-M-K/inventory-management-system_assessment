const express = require("express");
const { verifyJWT } = require("../middlewares/authMiddleware");
const { addSale, getAllSalesDetails } = require("../controller/salesController");
const router = express.Router();


router.post('/addsale',verifyJWT,addSale);
router.get("/getallsalesdetails",verifyJWT, getAllSalesDetails)


module.exports = router;