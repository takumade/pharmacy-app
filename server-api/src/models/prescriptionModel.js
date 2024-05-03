const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pharmacyId: {
        type: Schema.Types.ObjectId,
        ref: 'Pharmacy',
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
    },
    src: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    used: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
