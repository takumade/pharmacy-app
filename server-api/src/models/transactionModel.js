const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    transactionId: {
        type: String,
        required: true
    },
    orderId: {
        type: Schema.Types.ObjectId, // Reference to Order model
        ref: 'Order',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    pharmacyId: {
        type: Schema.Types.ObjectId, // Reference to Pharmacy model
        ref: 'Pharmacy',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now // Auto-generate timestamp
    },
    status: {
        type: String,
        required: true
    },
    responseCode: {
        type: String,
        default: "0" // Default response code
    },
    responseMessage: {
        type: String,
        required: true
    },
    paymentGateway: {
        type: String,
        required: true
    },
    cardType: String, // Removed lastFourDigits field
    data: String // Added data field as string
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
