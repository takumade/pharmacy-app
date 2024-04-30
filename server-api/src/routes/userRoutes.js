const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


// Define your routes
router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);
router.post('/delete:userId', authMiddleware.authenticateUser, userController.deleteAccount);
// Add more routes as needed

module.exports = router;