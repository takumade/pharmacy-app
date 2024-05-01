const express = require('express');
const router = express.Router();
const authMiddleware= require('../middlewares/authMiddleware');
const orderController = require('../controllers/orderController');


router.use(authMiddleware.authenticateUser);

// Define your routes
router.get('/', orderController.getOrders);
router.get('/:pharmacyId', orderController.getOrders);
router.get('/:orderId', orderController.getOrders);

router.post('/create', orderController.checkout);
router.post('/delete/:orderId', orderController.deleteOrder);
router.post('/delete-many', medicineController.deleteMedicines);
// Add more routes as needed

module.exports = router;