const { faker } = require("@faker-js/faker");

// Generate seed object for medicine
const medicineSeed = (pharmacyId=22, count = 1) => {
  let medicine = Array.from(Array(count)).map(d => ({
    medicineName: faker.commerce.productName(),
    image: faker.image.url(),
    brandName: faker.company.name(),
    genericName: faker.commerce.productAdjective(),
    dosageForm: faker.word.words(),
    dosageStrength: faker.word.words(),
    batchNumber: faker.string.alphanumeric(10),
    expirationDate: faker.date.future(),
    quantity: faker.number.int({min: 10, max: 100}),
    unitPrice: faker.commerce.price({min: 2}),
    manufacturer: faker.company.name(),
    supplier: faker.company.name(),
    storageConditions: faker.word.words(),
    notes: faker.lorem.paragraph(),
    lastUpdated: faker.date.recent(),
    prescriptionRequired: faker.datatype.boolean(),
    owner: pharmacyId // You need to replace this with the appropriate owner value
  }))

  return medicine


};

module.exports = medicineSeed

