const { faker } = require("@faker-js/faker");

// Generate seed object for pharmacy
const pharmacySeed = (userId) => {
  return {
    owner: userId,
    name: faker.company.name(),
    logo: faker.image.url(),
    location: faker.location.streetAddress(),
    latitude: parseFloat(faker.location.latitude()),
    longitude: parseFloat(faker.location.longitude()),
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
    cityCouncilLicense: faker.image.url(),
    pharmacistCouncilLicense:faker.image.url(),
    healthProfessionsAuthorityLicense: faker.image.url(),
    medicinesControlAuthorityLicense: faker.image.url(),
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


module.exports = pharmacySeed