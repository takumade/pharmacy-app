const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticateUser = async (req, res, next) => {
  // Check for the presence of the authorization header
  const token = req.headers.authorization;
  console.log('Authorization: ', token);
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Missing authorization header" });
  }


  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    // Find the user by ID
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    // Attach the user object to the request for further use in routes
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = { authenticateUser };