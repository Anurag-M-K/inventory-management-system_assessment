const bcrypt = require("bcrypt"); // Import the bcryptjs package
const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Validation
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  try {
    // Check if user email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      // Return a generic response without revealing the reason for failure
      res.status(400).json({
        success: false,
        message: "User already exists failed",
      });
    } else {
      // Generate a salt to use for hashing
      const salt = await bcrypt.genSalt(10);

      // Hash the password using the generated salt
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create a new user using the User model with the hashed password
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      // Save the new user to the database
      const savedUser = await newUser.save();

      res.status(200).json({
        success: true,
        message: "User registered successfully",
        user: savedUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred during registration",
      error: error.message,
    });
  }
};


//login
const login = async (req, res) => {
    console.log('hello',req.body)
    try {
      const { email, password } = req.body;
  
      // Check if the user with the given email exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: "Incorrect password",
        });
      }
  
      // Create and sign a JWT token
      const token = jwt.sign({ userId: user._id }, "secrete", {
        expiresIn: "1h",
      });
  
      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "An error occurred during login",
        error: error.message,
      });
    }
  };


  //get user data
  const getUser = async (req,res) => {
      
    try {
      const user = res.locals;
      res.send("get user data")
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "error while fetching user data",
        error: error.message,
      });
    }
  }

module.exports = {
    signup,
    login,
    getUser
    }