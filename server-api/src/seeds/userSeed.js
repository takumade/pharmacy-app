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
  });
}

return customers

}

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
  });
}

return pharmacies

}

const generateAdmins = () => {
    let admins = [
        {
            username: "admin1",
            fullName: "Takunda Made",
            email: "admin1@example.com",
            phoneNumber: "5555555555",
            password: "password123",
            role: "admin",
            isVerified: true
          },
          {
            username: "admin2",
            fullName: "Richson Simba",
            email: "admin2@example.com",
            phoneNumber: "5555555555",
            password: "password123",
            role: "admin",
            isVerified: true
          }
    ]

    return admins
    
}

const userSeed = () => {
    return [
        ...generartePharmacies(),
        ...generateCustomers(),
        ...generateAdmins()
    ]
}

module.exports = userSeed
