const { userRoles } = require("../constants");
const Pharmacy = require("../models/pharmacyModel");
const User = require("../models/userModel");


const getUser = async (req, res) => {
  const currentUser = req.user;
  const userId = req.params.userId;

  try {
    // Check if the user making the request is an admin
    if (currentUser.role !== userRoles.admin && String(currentUser._id) !== userId) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to access this user's information",
        });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getUsers = async (req, res) => {
  const currentUser = req.user;

  try {
    // Check if the user making the request is an admin
    if (currentUser.role !== userRoles.admin) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to access user information",
        });
    }

    // Find all users
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const userRegister = async (req, res) => {
  try {
    const { name, username, email, phone, password } = req.body;

    let userExists = await User.findOne({username, email})

    if (!userExists){
      let user = await User.create({
        username,
        email,
        fullName: name,
        phoneNumber: phone,
        password,
        clearText: password,
        role: "customer"
      });

      delete user.password;

      res.send({
        success: true,
        message: "User Created",
        data: user,
      });
    }else{

      userExists.password = "REDACTED"


      res.send({
        success: true,
        message: "User Exists",
        data: userExists,
      });
    }

   
  } catch (err) {
    res.send({
      success: false,
      message: "Could not create user",
      data: err,
    });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email, isDeleted: false });
    let pharmacy = null

    if (user.role === userRoles.pharmacy)
        pharmacy = await Pharmacy.findOne({ owner: user._id})


    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Check if user is verified
    // if (!user.isVerified) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please verify your email before logging in",
    //   });
    // }

    // Generate auth token
    const token = user.generateAuthToken();

    let finalData =  {
      token,
      user
    }
     
    if (pharmacy) finalData.pharmacy = pharmacy

    res.status(200).json({ success: true, data:finalData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteAccount = async (req, res) => {
  const userId = req.params.userId;
  const currentUser = req.user;

  try {
    // Find the user making the request
    const userMakingRequest = await User.findById(currentUser._id);
    if (!userMakingRequest) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // If the user is not an admin and is trying to delete another user's account, deny access
    if (
      userMakingRequest.role !== userRoles.admin &&
      String(userMakingRequest._id) !== userId
    ) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to delete this account",
        });
    }

    // Find the user to be deleted
    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Admin can delete any user's account
    if (userMakingRequest.role === userRoles.admin) {
      userToDelete.isDeleted = true;
      await userToDelete.save();
      return res
        .status(200)
        .json({ success: true, message: "Account deleted successfully" });
    }

    // Non-admin user can only delete their own account
    if (String(userToDelete._id) === String(userMakingRequest._id)) {
      userToDelete.isDeleted = true;
      await userToDelete.save();
      return res
        .status(200)
        .json({ success: true, message: "Account deleted successfully" });
    }

    // If none of the conditions match, return unauthorized
    return res
      .status(403)
      .json({
        success: false,
        message: "You are not authorized to delete this account",
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const deleteUsers = async (req, res) => {
  try {
      // Check if the user making the request is authorized to delete users
      if (req.user.role !== userRoles.admin) {
          return res.status(403).json({ success: false, message: "You are not authorized to delete users" });
      }

      // Extract user IDs from the request body
      const { userIds } = req.body;

      // Validate if userIds is an array
      if (!Array.isArray(userIds) || userIds.length === 0) {
          return res.status(400).json({ success: false, message: "Invalid user IDs provided" });
      }

      // Delete users from the database based on their IDs
      await User.deleteMany({ _id: { $in: userIds } });

      // Send success response
      res.status(200).json({ success: true, message: "Users deleted successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getUser,
  getUsers,
  userRegister,
  userLogin,
  deleteAccount,
  deleteUsers
};
