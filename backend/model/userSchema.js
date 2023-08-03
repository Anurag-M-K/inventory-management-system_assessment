const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:{type: String,required:true,unique:true},
  password: { type: String, required: true },
  photo: {
    type: String,
    required: [true, "Please add a photo"],
    default: "https://i.ibb.co/4pDNDk1/avatar.png",
  },

},{
  timestamps: true,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
    },
    "secrete",
    { expiresIn: "7d" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;