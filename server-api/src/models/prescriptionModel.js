const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    src: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
