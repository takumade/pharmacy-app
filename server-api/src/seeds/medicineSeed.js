const { faker } = require("@faker-js/faker");
const medicineData = require("./medicineData");


// Generate seed object for medicine
const medicineSeed = (pharmacyId=22, count = 1) => {
  let medicine = medicineData.slice(0, count).map(m => ({
    medicineName: m.medicineName,
    image: faker.image.url(),
    brandName: m.brandName,
    genericName: m.genericName,
    dosageForm: m.dosageForm,
    dosageStrength: m.dosageStrength,
    batchNumber: faker.string.alphanumeric(10),
    expirationDate: faker.date.future(),
    quantity: faker.number.int({min: 10, max: 100}),
    unitPrice: m.price,
    manufacturer: m.manufacturer,
    supplier: faker.company.name(),
    storageConditions: faker.word.words(),
    notes: faker.lorem.paragraph(),
    lastUpdated: faker.date.recent(),
    prescriptionRequired: m.prescriptionRequired,
    owner: pharmacyId // You need to replace this with the appropriate owner value
  }))

  return medicine


};

module.exports = medicineSeed

