const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pharmacyId: {
        type: Schema.Types.ObjectId,
        ref: 'Pharmacy',
        required: true
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        productName: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    prescriptions: [{
        prescriptionId: {
            type: Schema.Types.ObjectId,
            ref: 'Prescription',
            required: false
        }
     }],
    totalAmount: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    approveStatus: {
        type: String,
        enum: ['pending', 'approved', 'denied'],
        default: 'pending'
    },
    deniedReason: {
        type: String,
        default: ""
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
    paymentMethod: {
        type: String,
        required: true
    },

    transactionId: String
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
