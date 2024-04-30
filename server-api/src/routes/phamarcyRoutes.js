const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacyController');
const authMiddleware= require('../middlewares/authMiddleware');


router.use(authMiddleware.authenticateUser);

// Define your routes
router.post('/create', pharmacyController.createPharmacy);
router.post('/update', pharmacyController.editPharmacy);
router.post('/approve', pharmacyController.approvePharmacy);
router.post('/delete', pharmacyController.deletePharmacy);
// Add more routes as needed

module.exports = router;