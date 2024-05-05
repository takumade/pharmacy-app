const express = require('express');
const router = express.Router();
const authMiddleware= require('../middlewares/authMiddleware');
const orderController = require('../controllers/orderController');


router.use(authMiddleware.authenticateUser);

// Define your routes
router.get('/', orderController.getOrders);
router.get('/pharmacy/:pharmacyId', orderController.getOrders);
router.get('/:orderId', orderController.getOrder);

router.post('/create', orderController.checkout);
router.post('/delete/:orderId', orderController.deleteOrder);
// Add more routes as needed

module.exports = router;