




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
        if (req.user.role === 'admin' ||
            String(transaction.userId) === String(req.user._id)) {
            // If user is admin or transaction belongs to user
            return res.status(200).json({ success: true, data: transaction });
        } else if (req.user.role === 'pharmacy') {
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
        // Find transactions based on user role
        let transactions;
        if (req.user.role === 'admin') {
            // If user is admin, retrieve all transactions
            transactions = await Transaction.find();
        } else if (req.user.role === 'pharmacy') {
            // If user is pharmacy, retrieve transactions associated with their pharmacy
            const pharmacy = await Pharmacy.findOne({ owner: req.user._id });
            if (!pharmacy) {
                return res.status(404).json({ success: false, message: "Pharmacy not found" });
            }
            transactions = await Transaction.find({ pharmacyId: pharmacy._id });
        } else {
            // If user is regular user, retrieve transactions associated with their user ID
            transactions = await Transaction.find({ userId: req.user._id });
        }

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
        if (req.user.role === 'admin' ||
            String(transaction.userId) === String(req.user._id)) {
            // If user is admin or transaction belongs to user, delete the transaction
            await Transaction.findByIdAndDelete(transactionId);
            return res.status(200).json({ success: true, message: "Transaction deleted successfully" });
        } else if (req.user.role === 'pharmacy') {
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


