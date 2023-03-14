const { printConsole } = require("../utils/development");

const mongoose = require("mongoose");
const MONGO_DB_URI =
  process.env.MONGO_REMOTE_URL || process.env.MONGO_LOCAL_URL;

const connectToDB = async () => {
  try {
    printConsole(
      { data: "Connecting to MongoDB ......" },
      { printLocation: "db_config.js:12" },
      { textColor: "yellow" }
    );
    // mongodb+srv://melan-Ethiopia:<password>@cluster0.fnmxl2y.mongodb.net/?retryWrites=true&w=majority
    // "mongodb+srv://admin:bnadminpass@cluster0.ze5z9gi.mongodb.net/
    const DBConnection = await mongoose.connect("mongodb+srv://melan-Ethiopia:melanE1234@cluster0.fnmxl2y.mongodb.net/", {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    });

    printConsole(
      { data: `Database Connected : ${DBConnection.connection.host}` },
      { printLocation: "db_config.js:24" },
      {
        textColor: "green",
      }
    );
  } catch (error) {
    printConsole(error);

    process.exit(1);
  }
};

module.exports = connectToDB;
