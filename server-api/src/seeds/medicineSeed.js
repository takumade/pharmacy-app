const { faker } = require("@faker-js/faker");

// Generate seed object for medicine
const generateMedicineSeed = (pharmacyId=22) => {
  return {
    medicineName: faker.random.words(),
    image: faker.image.imageUrl(),
    brandName: faker.company.name(),
    genericName: faker.random.words(),
    dosageForm: faker.random.words(),
    dosageStrength: faker.random.words(),
    batchNumber: faker.random.alphaNumeric(10),
    expirationDate: faker.date.future(),
    quantity: faker.datatype.number(),
    unitPrice: faker.datatype.number(),
    totalPrice: faker.datatype.number(),
    manufacturer: faker.company.name(),
    supplier: faker.company.name(),
    storageConditions: faker.random.words(),
    notes: faker.lorem.paragraph(),
    lastUpdated: faker.date.recent(),
    prescriptionRequired: faker.datatype.boolean(),
    owner: pharmacyId // You need to replace this with the appropriate owner value
  };
};

// Example usage:
const medicineSeed = generateMedicineSeed();
console.log(medicineSeed);
