const userModel = require("../models/userModel");
const { hashPassword } = require("../utils/authUtils");
const Jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')


exports.registerController = async (req, res) => {
  try {
    const { email, name, password, phone, address } = req.body;

    //validation
    if (!name || !email || !password || !phone || !address) {
      return res.status(400).send({
        success: false,
        message: "Please fill all Required fields",
      });
    }
    //existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "User already exists",
      });
    }

    // Encryption password
    const hashedPassword = await hashPassword(password);

    //Save new User
    const user = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New User Created",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Error In Register callback",
      success: false,
      error,
    });
  }
};

//login user
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email and password",
      });
    }
    //not email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "email is not registerd",
      });
    }
    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invlid username or password",
      });
    }
    //token
    const token = await Jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      success: true,
      messgae: "login successfully",
      user:{
        name : user.name ,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Login Callback",
      error,
    });
  }
};


//Protected Route
exports.tokenController = (req,res)=>{
  
  try {
    res.send(" JWT TOKENProtected ")
  } catch (error) {
    console.log(error)
    res.send({error})
  }
}


