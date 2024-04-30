const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  contactInformation: {
    phone: String,
    email: String
  },
  operatingHours: {
    weekdays: {
      start: String,
      end: String
    },
    weekends: {
      start: String,
      end: String
    }
  },
  cityCouncilLicense: {
    type: String,
    required: true
  },
  pharmacistCouncilLicense: {
    type: String,
    required: true
  },
  healthProfessionsAuthorityLicense: {
    type: String,
    required: true
  },
  medicinesControlAuthorityLicense: {
    type: String,
    required: true
  },
  additionalNotes: String
});

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

module.exports = Pharmacy;
