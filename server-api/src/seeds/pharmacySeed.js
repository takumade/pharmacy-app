const { faker } = require("@faker-js/faker");

// Generate seed object for pharmacy
const generatePharmacySeed = (userId) => {
  return {
    owner: userId,
    name: faker.company.name(),
    logo: faker.image.imageUrl(),
    location: faker.address.streetAddress(),
    latitude: parseFloat(faker.address.latitude()),
    longitude: parseFloat(faker.address.longitude()),
    contactInformation: {
      phone: faker.phone.number(),
      email: faker.internet.email()
    },
    operatingHours: {
      weekdays: {
        start: "08:00",
        end: "20:00"
      },
      weekends: {
        start:"08:00",
        end: "16:00"
      }
    },
    cityCouncilLicense: faker.random.alphaNumeric(10),
    pharmacistCouncilLicense: faker.random.alphaNumeric(10),
    healthProfessionsAuthorityLicense: faker.random.alphaNumeric(10),
    medicinesControlAuthorityLicense: faker.random.alphaNumeric(10),
    isBanned: faker.datatype.boolean(),
    bannedEnd: faker.date.future(),
    isApproved: faker.datatype.boolean(),
    isDeleted: faker.datatype.boolean(),
    onFreeTrial: faker.datatype.boolean(),
    trialEnds: faker.date.future(),
    isSubscribed: faker.datatype.boolean(),
    subscriptionsEnds: faker.date.future(),
    additionalNotes: faker.lorem.paragraph()
  };
};


module.exports = generatePharmacySeed