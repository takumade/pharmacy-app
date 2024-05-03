const { faker } = require("@faker-js/faker");

let customersNo = 10;
let customers = [];

for (let index = 0; index < customersNo; index++) {
  customers.push({
    username: faker.internet.userName(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    password: "password123",
    role: "customer",
    isVerified: true,
  });
}
