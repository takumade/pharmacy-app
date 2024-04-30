const express = require('express');
const cors = require('cors');
const config = require('./config/config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define your routes here
const userRoutes = require("./routes/userRoutes");
const pharmacyRoutes = require('./routes/phamarcyRoutes');
const medicineRoutes = require('./routes/medicineRoutes');

app.use('/api/user', userRoutes);
app.use('/pharmacy', pharmacyRoutes)
app.use('/api/medicine', medicineRoutes);

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});