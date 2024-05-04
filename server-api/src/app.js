const express = require('express');
const cors = require('cors');
const config = require('./config/config');


const mongoose = require('mongoose');



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define your routes here
const userRoutes = require('./routes/userRoutes');
const pharmacyRoutes = require('./routes/phamarcyRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes')
const orderRoutes = require('./routes/ordersRoutes')
const transactionRoutes = require("./routes/transactionRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")

app.use('/api/user', userRoutes);
app.use('/api/pharmacy', pharmacyRoutes)
app.use('/api/medicine', medicineRoutes);
app.use('/api/prescription', prescriptionRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/dashboard', dashboardRoutes);


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodb_uri);
    console.log(`[+] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = {
    app,
    connectDB
}
