const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');

// Define your routes
router.get('/', medicineController.searchMedicines);
// Add more routes as needed

module.exports = router;