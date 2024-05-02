const express = require('express');
const cors = require('cors');
const config = require('./config/config');

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
const transactionRourtes = require("./routes/transactionRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")

app.use('/api/user', userRoutes);
app.use('/api/pharmacy', pharmacyRoutes)
app.use('/api/medicine', medicineRoutes);
app.use('/api/prescription', prescriptionRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/transaction', transactionRourtes);
app.use('/api/dashboard', dashboardRoutes);

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});