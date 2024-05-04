const { faker } = require("@faker-js/faker");

const generateCustomers = (customersNo = 10) => {
  let customers = [];

  for (let index = 0; index < customersNo; index++) {
    customers.push({
      username: faker.internet.userName(),
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: "password123",
      role: "customer",
      isVerified: true,
      avatar: faker.image.url(),
    });
  }

  return customers;
};

const generartePharmacies = (pharmacyNo = 10) => {
  let pharmacies = [];

  for (let index = 0; index < pharmacyNo; index++) {
    pharmacies.push({
      username: faker.internet.userName(),
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: "password123",
      role: "pharmacy",
      isVerified: true,
      avatar: faker.image.url(),
      verificationImage: faker.image.url(),
    });
  }

  return pharmacies;
};

const generateAdmins = () => {
  let admins = [
    {
      username: "admin1",
      fullName: "Takunda Made",
      email: "admin1@example.com",
      phoneNumber: faker.phone.number(),
      password: "password123",
      role: "admin",
      isVerified: true,
      avatar: faker.image.url(),
    },
    {
      username: "admin2",
      fullName: "Richson Simba",
      email: "admin2@example.com",
      phoneNumber: faker.phone.number(),
      password: "password123",
      role: "admin",
      isVerified: true,
      avatar: faker.image.url(),
    },
  ];

  return admins;
};

const hashPass = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
};

const userSeed = async () => {
  let allUsers = [
    ...generartePharmacies(),
    ...generateCustomers(),
    ...generateAdmins(),
  ].map(async (user) => ({
    ...user,
    password: await hashPass(user.password),
    clearText: user.password,
  }));

  return allUsers;
};

module.exports = userSeed;
