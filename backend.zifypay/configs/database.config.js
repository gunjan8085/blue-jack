require("dotenv").config();
const mongoose = require("mongoose");

// ############### MongoDB configs ###############

const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;
const MONGODB_PROJECT_NAME = process.env.MONGODB_PROJECT_NAME;

// const MONGODB_URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.mongodb.net/${MONGODB_DB_NAME}?retryWrites=true&w=majority&appName=${MONGODB_PROJECT_NAME}`;
const MONGODB_URI = `mongodb+srv://birlapranjal460:OSoLJzGoDlhPh5OT@ninexfoldmain.hb8fltn.mongodb.net/pos`;


const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectToDatabase();

module.exports = connectToDatabase;


// mayanksahu0024

// 0XCvvsVMBfUHTqPK


// mongodb+srv://mayanksahu0024:0XCvvsVMBfUHTqPK@zifypay.71cgbqb.mongodb.net/