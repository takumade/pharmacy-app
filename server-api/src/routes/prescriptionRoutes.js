const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const authMiddleware= require('../middlewares/authMiddleware');


router.use(authMiddleware.authenticateUser);

// Define your routes

router.get('/:prescriptionId', prescriptionController.getPrescription);
router.get('/', prescriptionController.getPrescriptions);

router.post('/create', prescriptionController.createPrescription);
router.post('/approve:prescriptionId', prescriptionController.approvePrescription);
router.post('/delete:prescriptionId', prescriptionController.deletePrescription);
// Add more routes as needed

module.exports = router;