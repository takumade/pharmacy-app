const { faker } = require("@faker-js/faker");

const orderSeed = (userId="6136f7f8eaa0e84132d4f5bd", pharmacyId="6136f7f8eaa0e84132d4f5be", products=[], presciptions=[]) => {
    return {
        userId: userId,
        pharmacy: pharmacyId,
        items: products,
        prescriptions: presciptions,
        totalAmount: 27.97,
        status: "processing",
        shippingAddress: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        postalCode: faker.location.zipCode(),
        country: faker.location.country()
        },
        paymentMethod: "cash_on_delivery",
        transactionId: "txn1234567890"
    }

}

module.exports = orderSeed
  