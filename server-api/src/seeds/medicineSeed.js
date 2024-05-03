const { faker } = require("@faker-js/faker");

// Generate seed object for medicine
const generateMedicineSeed = (pharmacyId=22) => {
  return {
    medicineName: faker.word.words(),
    image: faker.image.url(),
    brandName: faker.company.name(),
    genericName: faker.word.words(),
    dosageForm: faker.word.words(),
    dosageStrength: faker.word.words(),
    batchNumber: faker.string.alphanumeric(10),
    expirationDate: faker.date.future(),
    quantity: faker.number.int(),
    unitPrice: faker.number.float(),
    totalPrice: faker.number.float(),
    manufacturer: faker.company.name(),
    supplier: faker.company.name(),
    storageConditions: faker.word.words(),
    notes: faker.lorem.paragraph(),
    lastUpdated: faker.date.recent(),
    prescriptionRequired: faker.datatype.boolean(),
    owner: pharmacyId // You need to replace this with the appropriate owner value
  };
};

module.exports = generateMedicineSeed

