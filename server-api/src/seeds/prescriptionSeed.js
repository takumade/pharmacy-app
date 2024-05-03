const { faker } = require("@faker-js/faker");

// Generate fake object for prescription
const generatePrescriptionSeed = (userId = 22) => {
  return {
    owner: userId, // Replace this with the appropriate user id
    src: faker.image.url(),
    approved: faker.datatype.boolean(),
    used: false,
    date: faker.date.past()
  };
};

// Example usage:
module.exports = generatePrescriptionSeed();