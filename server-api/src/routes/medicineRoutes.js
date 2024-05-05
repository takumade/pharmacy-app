const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');
const authMiddleware= require('../middlewares/authMiddleware');


router.use(authMiddleware.authenticateUser);

// Define your routes
router.get('/search', medicineController.searchMedicine);
router.get('/', medicineController.getMedicines);
router.get('/:medicineId', medicineController.getMedicine);


router.post('/create', medicineController.addMedicine);
router.post('/create-many', medicineController.addMedicines);
router.post('/edit/:medicineId', medicineController.editMedicine);
router.post('/delete/:medicineId', medicineController.deleteMedicine);
router.post('/delete-many', medicineController.deleteMedicines);
// Add more routes as needed

module.exports = router;