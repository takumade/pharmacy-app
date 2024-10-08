const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  medicineName: {
    type: String,
    required: true
  },
  image: String,
  brandName: String,
  genericName: String,
  dosageForm: String,
  dosageStrength: String,
  batchNumber: String,
  expirationDate: Date,
  quantity: {
    type: Number,
    required: true
  },
  unitPrice: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
  },
  manufacturer: String,
  supplier: String,
  storageConditions: String,
  notes: String,
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  prescriptionRequired: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pharmacy'
  }
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
