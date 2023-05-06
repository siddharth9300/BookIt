const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../model/userSchema");

// const router = express.Router();
// // const jwt = require("jsonwebtoken")
// const cookieParser = require("cookie-parser");

// // const cookieParser = require("cookie-parser");
// // router.use(cookieParser());

// router.use(cookieParser());

const register = async (req, res,next) => {
    const { name, email, phone, userType, password, cpassword } = req.body;
  
    if (!name || !email || !phone || !userType || !password || !cpassword) {
      return res.status(422).json({ error: "Please fill all details" });
    }
    // Regular expression to validate full name with at least two words separated by a space
  
    const nameRegex = /^[\w']+\s[\w']+$/;
  
    if (!nameRegex.test(name)) {
      return res.status(422).json({ error: "Please enter your full name" });
    }
    // Regular expression to validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
  
    if (!emailRegex.test(email)) {
      return res.status(422).json({ error: "Please enter a valid email address" });
    }
  
    // Phone validation
    if (phone.length !== 10) {
      return res.status(422).json({ error: "Please enter a valid 10-digit phone number" });
    }
  
    // Password length validation
    if (password.length < 7) {
      return res.status(422).json({ error: "Password must contain at least 7 characters" });
    }
  
    if (password !== cpassword) {
      return res.status(422).json({ error: "Password and confirm password do not match" });
    }
  
    try {
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(422).json({ error: "Email already exists" });
      } else {
        const user = new User({ name, email, phone, userType, password, cpassword });
  
        // Perform additional validation or data processing here
  
        await user.save();
        return res.status(201).json({ message: "Saved successfully" });
      }
    } catch (error) {
        next(error);
    }
  }





const login = async (req, res,next) => {
    // console.log(req.body);
    // res.json({message:"login success"})
    try {
      let token;
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Please fill all details" });
      }
  
      const userLogin = await User.findOne({ email });
  
      if (userLogin) {
        const isMatch = await bcrypt.compare(password, userLogin.password);
  
        token = await userLogin.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 9000000),
          path :"/",
          // expires: new Date(Date.now() + 900),

          // httpOnly: true,
        });


        console.log(token);
  
        if (!isMatch) {
          res.status(400).json({ error: "Invalid Cridential" });
        } else {
          res.status(200)
          .send(userLogin).json({ message: "user login successfully" })
        }
      } else {
        res.status(400).json({ error: "Invalid Cridential" });
      }
    } catch (error) {
        next(error);
    }
  }





  const about = async (req, res) => {
    console.log("about page");
    res.send(req.rootUser);
  }
  
  //get user data for contact us and home page
  const getdata = async (req, res) => {
        console.log("getdata page");
    res.send(req.rootUser);
  }





  const contact = async (req, res,next) => {
    try {
      const { name, email, phone, message } = req.body;
  
      if (!name || !email || !phone || !message) {
        console.log("error in contact form");
        return res.json({ error: "Plz fill form correctly" });
      }
  
  const userContact = await  User.findOne({_id:req.userID})
  
  if (userContact){
    console.log("user find");
  
    const userMessage = await userContact.addMessage(name,email,phone,message)
    await userContact.save();
  
    res.status(201).json({message:"message created"})
  
  }
  
    } catch (error) {
        next(error);
    }
  }
  
  

  
  const logout = async (req, res, next) => {
    // const userId = req.userId; // get the userId from the request header
    try {
      const userId = req.params.userId;
      // remove the user token from the database
      const user = await User.findByIdAndUpdate(
        {_id: userId},
        { $unset: { tokens: 1 } },
        { new: true }
      );
  
      // clear the cookie
      res.clearCookie("jwtoken",{path:"/"});
  
      res.status(200).send("User logged out successfully");
    } catch (error) {
      next(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  
module.exports = { register, login, about, getdata, contact ,logout};
