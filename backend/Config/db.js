require("dotenv").config({ path: "../config.env" });
const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.set('strictQuery', true);  
  await mongoose.connect(process.env.MONGO_CONNECT),(err) => {
        if (!err) {
          console.log("MongoDB Connection Succeeded.");
        } else {
          console.log("Error in DB connection: " + err);
        }
      }
    } 

module.exports = connectDB;