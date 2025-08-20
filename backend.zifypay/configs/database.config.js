require("dotenv").config();
const mongoose = require("mongoose");

// ############### MongoDB configs ###############

const connectToDatabase = async () => {
  try {

    console.log( "NODE_ENV " , process.env.NODE_ENV)
    if (process.env.NODE_ENV === "development") {
      console.log("Connecting to MongoDB in development mode...");
          await mongoose.connect(
            process.env.MONGODB_URI_DEV ||
              "mongodb+srv://birlapranjal460:OSoLJzGoDlhPh5OT@ninexfoldmain.hb8fltn.mongodb.net/pos"
          );

    } else if (process.env.NODE_ENV === "production") {
      console.log("Connecting to MongoDB in production mode...");
          await mongoose.connect(
            process.env.MONGODB_URI_PROD ||
              "mongodb+srv://birlapranjal460:OSoLJzGoDlhPh5OT@ninexfoldmain.hb8fltn.mongodb.net/pos");
    }
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectToDatabase();

module.exports = connectToDatabase;

