const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware= require('../middlewares/authMiddleware');


router.use(authMiddleware.authenticateUser);

// Define your routes
router.get('/admin', dashboardController.getAdminStats);
router.get('/pharmacy', dashboardController.getPharmacyStats);

// Add more routes as needed

module.exports = router;