const { printConsole } = require("../utils/development");
const mongoose = require("mongoose");

// Fetch MongoDB URI from environment variables
const MONGO_DB_URI = "mongodb+srv://melan-Ethiopia:Mems@2015@cluster0.fnmxl2y.mongodb.net/?retryWrites=true&w=majority"

const connectToDB = async () => {
  try {
    // Deprecation warning fix
    mongoose.set('strictQuery', false);

    // Log message indicating that the connection is starting
    printConsole(
      { data: "Connecting to MongoDB ......" },
      { printLocation: "db_config.js:12" },
      { textColor: "yellow" }
    );

    // Connect to the database using the URI from environment variables
    const DBConnection = await mongoose.connect('mongodb+srv://melan-Ethiopia:F4RTmiGrBdjE4OP6@cluster0.fnmxl2y.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log message indicating successful connection
    printConsole(
      { data: `Database Connected: ${DBConnection.connection.host}` },
      { printLocation: "db_config.js:24" },
      { textColor: "green" }
    );
  } catch (error) {
    // Log error message and exit the process
    printConsole(
      { data: `Database connection failed: ${error.message}` },
      { printLocation: "db_config.js:28" },
      { textColor: "red" }
    );
    console.error(error.stack);

    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectToDB;
