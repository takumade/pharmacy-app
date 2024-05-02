const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware= require('../middlewares/authMiddleware');


router.use(authMiddleware.authenticateUser);

// Define your routes
router.get('/', transactionController.getTransactions);
router.get('/:transactionId', transactionController.getTransaction);

router.post('/create', transactionController.createTransaction);
router.post('/delete/:transactionId', transactionController.deleteTransaction);
router.post('/delete', transactionController.deleteTransactions);
// Add more routes as needed

module.exports = router;