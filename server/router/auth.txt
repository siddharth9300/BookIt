const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken")
const User = require("../model/userSchema");
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");

require("../DB/conn");
// const cookieParser = require("cookie-parser");
// router.use(cookieParser());

router.use(cookieParser());

router.get("/", (req, res) => {
  res.send(`Home Page`);
});
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
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
      const user = new User({ name, email, phone, work, password, cpassword });

      // Perform additional validation or data processing here

      await user.save();
      return res.status(201).json({ message: "Saved successfully" });
    }
  } catch (err) {
    // console.log(err);
  }
});

// login route

router.post("/login", async (req, res) => {
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
        httpOnly: true,
      });
      // console.log(token);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        res.status(200)
        .send(userLogin).json({ message: "user login successfully" })
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    // console.log(err);
  }
});

// about us ka page

router.get("/about", authenticate, (req, res) => {
  // console.log("about page");
  res.send(req.rootUser);
});

//get user data for contact us and home page
router.get("/getdata", authenticate, (req, res) => {
  // console.log("getdata page");
  res.send(req.rootUser);
});

// contact us page
router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      // console.log("error in contact form");
      return res.json({ error: "Plz fill form correctly" });
    }

const userContact = await  User.findOne({_id:req.userID})

if (userContact){
  // console.log("user find");

  const userMessage = await userContact.addMessage(name,email,phone,message)
  await userContact.save();

  res.status(201).json({message:"message created"})

}

  } catch (error) {
    // console.log(error);
  }
});



// logout page
// router.get("/logout", authenticate, (req, res) => {
//   // console.log("logout page");
//   res.clearCookie("jwtoken",{path:"/"})
//   res.status(200).send("user logout");
// });
// module.exports = router;

// logout page
router.get("/logout", authenticate, async (req, res) => {
  // console.log("logout page");
  try {
    // Remove the token from the user document in the database
    // const userId = req.userID;
    const user = await User.findByIdAndUpdate(
      {_id:req.userID},
      { $unset: { tokens: 1 } },
      { new: true }
    );

    // Clear the cookie
    res.clearCookie("jwtoken",{path:"/"});

    res.status(200).send("User logged out successfully");
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
