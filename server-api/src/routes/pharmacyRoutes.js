const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacyController');
const authMiddleware= require('../middlewares/authMiddleware');


router.use(authMiddleware.authenticateUser);

// Define your routes

router.get('/search', pharmacyController.searchPharmacies);
router.get('/:pharmacyId', pharmacyController.getPharmacy);
router.get('/', pharmacyController.getPharmacies);
router.get('/customers', pharmacyController.getCustomers);
router.get('/applications', pharmacyController.getApplications);

router.post('/create', pharmacyController.createPharmacy);
router.post('/update/:pharmacyId', pharmacyController.editPharmacy);
router.post('/approve/:pharmacyId', pharmacyController.approvePharmacy);
router.post('/decline/:pharmacyId', pharmacyController.declinePharmacy);
router.post('/delete/:pharmacyId', pharmacyController.deletePharmacy);
// Add more routes as needed

module.exports = router;