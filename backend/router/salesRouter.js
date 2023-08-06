const express = require("express");
const { verifyJWT } = require("../middlewares/authMiddleware");
const { addSale, getAllSalesDetails,sendEmail } = require("../controller/salesController");
const multer = require('multer');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

router.post('/addsale',verifyJWT,addSale);
router.get("/getallsalesdetails", getAllSalesDetails)
router.post('/sendemail', upload, sendEmail)

module.exports = router;