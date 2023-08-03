const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const verifyJWT =async (req,res,next) => {
    const token = "req.headers.authorization";
        try {
        const decoded = await jwt.verify(token,"secrete");
        const userId = decoded.userId;
        User.findById(userId).then((user) => {
            if(user){
                res.locals = user;
                next()
            }else{
                res.send("Not authorized please login")
            }
        })
    } catch (error) {
        res.json({message : "Invalid Token"});
        console.log(error)
    }
}

exports.verifyJWT = verifyJWT;