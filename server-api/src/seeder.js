const config = require("./config/config");
const medicineSeed = require("./seeds/medicineSeed");
const pharmacySeed = require("./seeds/pharmacySeed");
const prescriptionSeed = require("./seeds/prescriptionSeed");
const userSeed = require("./seeds/userSeed");

const mongoose = require("mongoose");

const seedData = async () => {
  // Seed users first
  // Grab user with rol custeomer and seed prescriptions
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
