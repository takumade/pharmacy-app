const config = require("./config/config");
const medicineSeed = require("./seeds/medicineSeed");
const pharmacySeed = require("./seeds/pharmacySeed");
const prescriptionSeed = require("./seeds/prescriptionSeed");
const userSeed = require("./seeds/userSeed");

const mongoose = require("mongoose");
const Pharmacy = require("./models/pharmacyModel");
const Medicine = require("./models/medicineModel");
const Prescription = require("./models/prescriptionModel");
const User = require("./models/userModel");
const orderSeed = require("./seeds/orderSeed");
const Order = require("./models/orderModel");
const transactionSeed = require("./seeds/transactionSeed");
const Transaction = require("./models/transactionModel");


const seedData = async () => {
  // Seed users first
  console.log("[+] Seeding users....")
  let users = await User.insertMany(await userSeed())
  
  let customers = users.filter(user => user.role === "customer")
  let pharmacies = users.filter(user => user.role === "pharmacy")

  console.log("[+] Seeding presciptions....")
  let prescriptions = await Prescription.insertMany(customers.map(customer => prescriptionSeed(customer._id)))

  console.log("[+] Seeding pharmacies....")
  let pharmaciesList = await Pharmacy.insertMany(pharmacies.map(pharmacy => pharmacySeed(pharmacy._id)))

  let insertMedicines = []


   // Grap  pharmacies and seed medicine
   console.log("[+] Seeding medicines, orders and transactions....")

   for (let index = 0; index < pharmaciesList.length; index++) {
    const pharmacy = pharmaciesList[index];

    // Seed medicines
    let medicines  = await Medicine.insertMany(medicineSeed(pharmacy._id, 10))

  customers.forEach(async(customer) => {
      let products = medicines.slice(0, 3).map(medicine => ({
        productId: medicine._id,
        productName: medicine.medicineName,
        quantity: 2,
        price: medicine.unitPrice
      }));

      let userPrescriptions = prescriptions.filter(p => p.owner == customer._id)




      let order = await orderSeed(customer._id, pharmacy._id, products,  userPrescriptions[0])
      let createdOrder = await Order.create(order)

      let txn = await transactionSeed(customer._id, pharmacy._id, createdOrder._id, createdOrder.totalAmount)
      let createdTxn = await Transaction.create(txn)


      

    })


    
    
   }

 

 
 
  console.log("[100%] Done sedding!....")
  process.exit(0);
};

const seedApplication = async () => {
  try {
    mongoose.connect(config.mongodb_uri).then((conn) => {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      seedData();
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

seedApplication();
