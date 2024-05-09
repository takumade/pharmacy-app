const { faker } = require("@faker-js/faker");
const pharmacyData = require("./pharmacyData");
const { applicationStatus } = require("../constants");

// Generate seed object for pharmacy
const pharmacySeed = (index, userId) => {

  let pharmacyRealistic = pharmacyData[index]

  let isApproved = faker.datatype.boolean()


  return {
    owner: userId,
    name: pharmacyRealistic.name,
    logo: faker.image.url(),
    location: faker.location.streetAddress(),
    latitude: pharmacyRealistic.latitude,
    longitude: pharmacyRealistic.longitude,
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
    isApproved: isApproved,
    applicationStatus: isApproved ? applicationStatus.approved : applicationStatus.pending,
    isDeleted: faker.datatype.boolean(),
    onFreeTrial: faker.datatype.boolean(),
    trialEnds: faker.date.future(),
    isSubscribed: faker.datatype.boolean(),
    subscriptionsEnds: faker.date.future(),
    additionalNotes: faker.lorem.paragraph()
  };
};


module.exports = pharmacySeed