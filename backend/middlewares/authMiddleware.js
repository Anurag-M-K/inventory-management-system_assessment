const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Get the token without the "Bearer " prefix
    try {
      const decoded = await jwt.verify(token,"secrete");
      const userId = decoded.userId;
      User.findById(userId).then((user) => {
        if (user) {
          res.locals.user = user; // Set the user object in the response locals
          next();
        } else {
          res.send("Not authorized, please login");
        }
      });
    } catch (error) {
      res.json({ message: "Invalid Token" });
      console.log(error);
    }
  } else {
    res.send("No authorization header provided");
  }
};

exports.verifyJWT = verifyJWT;
