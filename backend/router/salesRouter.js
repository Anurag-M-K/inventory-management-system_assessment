const express = require("express");
const { verifyJWT } = require("../middlewares/authMiddleware");
const { addSale, getAllSalesDetails,sendEmail } = require("../controller/salesController");
const router = express.Router();


router.post('/addsale',verifyJWT,addSale);
router.get("/getallsalesdetails", getAllSalesDetails)

// server/routes/email.js


// POST route to send email with data
router.post('/sendemail', sendEmail);


module.exports = router;