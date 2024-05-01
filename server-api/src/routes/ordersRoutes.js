const express = require('express');
const router = express.Router();
const authMiddleware= require('../middlewares/authMiddleware');
const orderController = require('../controllers/orderController');


router.use(authMiddleware.authenticateUser);

// Define your routes
router.get('/', orderController.getOrders);
router.get('/:pharmacyId', orderController.getOrders);
router.get('/:orderId', medicineController.getMedicine);

router.post('/create', medicineController.addMedicine);
router.post('/create-many', medicineController.addMedicines);
router.post('/edit/:medicineId', medicineController.editMedicine);
router.post('/delete/:medicineId', medicineController.deleteMedicine);
router.post('/delete-many', medicineController.deleteMedicines);
// Add more routes as needed

module.exports = router;