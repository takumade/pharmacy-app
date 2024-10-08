// user.model.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    unique: false,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  clearText: {
    type: String,
  },
  role: {
    type: String,
    enum: ['customer', 'pharmacy', 'admin'],
    default: 'customer'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  avatar: String,
  verificationImage:String,
  verificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date
});

// Hash password before saving user
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// Method to generate auth token
userSchema.methods.generateAuthToken = function() {
  const user = this;
  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY);
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
