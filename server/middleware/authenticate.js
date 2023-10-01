const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const Authenticate = async (req, res, next) => {
  try {
    // const token = req.cookies.jwtoken;
    // const token = req.headers["authorization"];
    const bearerHeader = req.headers["authorization"];
    // console.log("bearerHeader:", bearerHeader);

    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    // console.log("auth called");

    // const token = req.sessionstotage.jwtoken;
    // const token = window.sessionStorage.getItem('jwtoken');
    // console.log(token);
    const verifyTokens = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(verifyTokens);
    const rootUser = await User.findOne({
      _id: verifyTokens._id,
      "tokens.token": token,
    });

    // console.log(rootUser);
    if (!rootUser) {
      throw new Error("user not found");}
      
      req.token = token;

      req.rootUser = rootUser;
      req.userID = rootUser._id;
      next();
    
  } catch (error) {
    res.status(401).send("unauthorized:No token provided");
    // console.log(error);
  }
};

module.exports = Authenticate;
