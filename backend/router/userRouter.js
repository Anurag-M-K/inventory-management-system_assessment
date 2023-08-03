const express = require("express");
const router = express.Router();
const { signup, login, getUser } = require("../controller/userController");
const { verifyJWT } = require("../middlewares/authMiddleware");


router.post("/signup",signup)
router.post("/login",login)
router.get("/getuser",verifyJWT, getUser)
// router.patch("/updateuser",updateUser)

module.exports = router;