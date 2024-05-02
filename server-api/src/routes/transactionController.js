




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

const getTransaction = (reql, res) => {
    
}

const getTransactions = (reql, res) => {
    
}

const deleteTransaction = (reql, res) => {
    
}