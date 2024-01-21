const JWT = require("jsonwebtoken");
const  userModel = require("../models/userModel");

//Protected Routes Token Based
exports.signIn = async (req, res, next) => {
  try {
    const decode = JWT.verify( req.headers.authorization, process.env.JWT_TOKEN);  //encryption 
    req.user = decode;   // decryption
    next();
  } catch (error) {
    console.log(error);
  }
};

//For Admin Authorization
exports.isAdmin = async (req, res, next) => {
   try {
    const user = await  userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
