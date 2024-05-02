const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware= require('../middlewares/authMiddleware');


router.use(authMiddleware.authenticateUser);

// Define your routes
router.get('/', transactionController.getTransactions);
router.get('/:transactionId', transactionController.getTransaction);

router.post('/create', medicineController.addMedicine);
router.post('/create-many', medicineController.addMedicines);
router.post('/edit/:medicineId', medicineController.editMedicine);
router.post('/delete/:medicineId', medicineController.deleteMedicine);
router.post('/delete-many', medicineController.deleteMedicines);
// Add more routes as needed

module.exports = router;