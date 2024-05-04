const { app, connectDB } = require("./app");
const config = require('./config/config');

// Start the server
app.listen(config.port, () => {
  console.log(`[+] Server is running on port ${config.port}`);

  connectDB()
  
});