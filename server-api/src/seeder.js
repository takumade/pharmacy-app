const config = require("./config/config");
const medicineSeed = require("./seeds/medicineSeed");
const pharmacySeed = require("./seeds/pharmacySeed");
const prescriptionSeed = require("./seeds/prescriptionSeed");
const userSeed = require("./seeds/userSeed");

const mongoose = require("mongoose");
const Pharmacy = require("./models/pharmacyModel");
const Medicine = require("./models/medicineModel");
const Prescription = require("./models/prescriptionModel");
const User = require("./models/userModel");





const seedData = async () => {
  // Seed users first

  let users = await User.insertMany(userSeed())
  
  let customers = users.filter(user => user.role === "customer")
  let pharmacies = users.filter(user => user.role === "pharmacy")

  

  let prescription = await Prescription.insertMany(customers.map(customer => prescriptionSeed(customer._id)))


  // Grab user with role pharmacy id and seed pharmacy
  // Grap  pharmacies and seed medicine
};

const seedApplication = async () => {
  try {
    mongoose.connect(config.mongodb_uri).then((conn) => {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      seedData();
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

seedApplication();
