const { userRoles } = require("../constants");
const Pharmacy = require("../models/pharmacyModel");
const Transaction = require("../models/transactionModel");


const createTransaction = async (req, res) => {
    try {
        // Extract transaction data from the request body
        const {
            orderId,
            pharmacyId,
            amount,
            status,
            responseMessage,
            paymentGateway,
            cardType,
            data
        } = req.body;

        // Extract userId from req.user._id
        const userId = req.user._id;

        // Generate transactionId based on the specified format
        const currentTimestamp = Date.now();
        const transactionId = `txn-${userId}-${pharmacyId}-${currentTimestamp}`;

        // Create a new transaction object
        const newTransaction = new Transaction({
            transactionId,
            orderId,
            userId,
            pharmacyId,
            amount,
            status,
            responseMessage,
            paymentGateway,
            cardType,
            data
        });

        // Save the transaction to the database
        const savedTransaction = await newTransaction.save();

        // Send success response
        res.status(201).json({ success: true, message: "Transaction created successfully", transaction: savedTransaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getTransaction = async (req, res) => {
    try {
        // Extract transactionId from the request parameters
        const transactionId = req.params.transactionId;

        // Find the transaction in the database
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        // Check if the user making the request is authorized to access the transaction
        if (req.user.role === userRoles.admin ||
            String(transaction.userId) === String(req.user._id)) {
            // If user is admin or transaction belongs to user
            return res.status(200).json({ success: true, data: transaction });
        } else if (req.user.role === userRoles.pharmacy) {
            // If user is pharmacy, check if the transaction is associated with their pharmacy
            const pharmacy = await Pharmacy.findOne({ owner: req.user._id });
            if (!pharmacy || String(pharmacy._id) !== String(transaction.pharmacyId)) {
                // If pharmacy not found or transaction not associated with pharmacy
                return res.status(403).json({ success: false, message: "You are not authorized to access this transaction" });
            } else {
                // If transaction associated with pharmacy, return the transaction
                return res.status(200).json({ success: true, data: transaction });
            }
        } else {
            // Otherwise, user is not authorized to access the transaction
            return res.status(403).json({ success: false, message: "You are not authorized to access this transaction" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getTransactions = async (req, res) => {
    try {
        // Define the criteria to filter transactions
        const criteria = {};
        let transactions = []

        // Optionally, you can filter transactions based on the requesting user's ID
        if (req.user.role === userRoles.customer) {
            criteria.userId = req.user._id;
        }

        // Optionally, you can filter transactions based on other parameters
        // For example, you might want to filter transactions by pharmacy
        if (req.user.role === userRoles.pharmacy) {
            let pharmacy = await Pharmacy.find({owner: req.user._id})
            criteria.pharmacy = pharmacy._id;
        }

        // Find transactions in the database based on the criteria
        if (req.user.role === userRoles.admin)
            transactions = await Transaction.find();
        else
            transactions = await Transaction.find(criteria);

        // Send the transactions in the response
        res.status(200).json({ success: true, data: transactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


const deleteTransaction = async (req, res) => {
    try {
        // Extract transactionId from the request parameters
        const transactionId = req.params.transactionId;

        // Find the transaction in the database
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        // Check if the user making the request is authorized to delete the transaction
        if (req.user.role === userRoles.admin ||
            String(transaction.userId) === String(req.user._id)) {
            // If user is admin or transaction belongs to user, delete the transaction
            await Transaction.findByIdAndDelete(transactionId);
            return res.status(200).json({ success: true, message: "Transaction deleted successfully" });
        } else if (req.user.role === userRoles.pharmacy) {
            // If user is pharmacy, check if the transaction is associated with their pharmacy
            const pharmacy = await Pharmacy.findOne({ owner: req.user._id });
            if (!pharmacy || String(pharmacy._id) !== String(transaction.pharmacyId)) {
                // If pharmacy not found or transaction not associated with pharmacy, deny access
                return res.status(403).json({ success: false, message: "You are not authorized to delete this transaction" });
            } else {
                // If transaction associated with pharmacy, delete the transaction
                await Transaction.findByIdAndDelete(transactionId);
                return res.status(200).json({ success: true, message: "Transaction deleted successfully" });
            }
        } else {
            // Otherwise, user is not authorized to delete the transaction
            return res.status(403).json({ success: false, message: "You are not authorized to delete this transaction" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const deleteTransactions = async (req, res) => {
    try {
        // Extract transactionIds from the request body
        const { transactionIds } = req.body;

        // Find transactions in the database
        const transactions = await Transaction.find({ _id: { $in: transactionIds } });
        if (transactions.length === 0) {
            return res.status(404).json({ success: false, message: "No transactions found" });
        }

        // Check if the user making the request is authorized to delete the transactions
        if (req.user.role === userRoles.admin) {
            // If user is admin, delete the transactions
            await Transaction.deleteMany({ _id: { $in: transactionIds } });
            return res.status(200).json({ success: true, message: "Transactions deleted successfully" });
        } else {
            // Otherwise, user is not authorized to delete the transactions
            return res.status(403).json({ success: false, message: "You are not authorized to delete transactions" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    getTransaction,
    getTransactions,
    createTransaction,
    deleteTransaction,
    deleteTransactions
}


