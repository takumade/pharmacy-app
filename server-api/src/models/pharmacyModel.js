const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
  
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },  
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: false
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
  isBanned: {
    type: Boolean,
    default: false
  },
  bannedEnd: {
    type: Date
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  applicationStatus: {
    type: String,
    default: "pending"
  },
  applicationReason: {
    type: String,
    default: ""
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  onFreeTrial: {
    type: Boolean,
    default: false
  },
  trialEnds: {
    type: Date
  },
  isSubscribed: {
    type: Boolean,
    default: false
  },
  packageId: {
    type: String
  },
  subscriptionsEnds: {
    type: Date
  },
  additionalNotes: String
});

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

module.exports = Pharmacy;
