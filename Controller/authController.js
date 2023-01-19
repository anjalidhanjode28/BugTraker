const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authController = require("express").Router()
const {authModel} = require("../Model/authModel")
require("dotenv").config()


authController.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, salt);
      const newUser = authModel({
        email: email,
        password: hashedpassword,
      });
      await newUser.save();
      console.log("Signup Successfully");
      res.status(200).json({ message: "Signup Successfully" });
    } catch (err) {
    //   res.status(500).json(err);
    res.send(err.message)
    }
  });


  authController.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password)
    try {
      const user =await authModel.findOne({ email });
      if (!user) return res.status(400).json("wrong credentials");
      console.log(user);
  
      const validation = await bcrypt.compare(password, user.password);
  
      if (!validation) return res.status(400).json("Wrong Password");
  
      console.log("Login Successfully");
  
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
  
      res.status(200).json({ message: "Login Successfull", token });
    } catch (err) {
        console.log(err);
    }
  });
  
  module.exports = { authController };