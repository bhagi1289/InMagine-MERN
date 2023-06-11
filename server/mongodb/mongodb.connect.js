
const MONGO_URL =
  "mongodb+srv://root:bhagi123@cluster0.3lhznwo.mongodb.net/restaurant?retryWrites=true&w=majority";
const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(MONGO_URL), { userNewUrlParser: true };
  } catch (error) {
    console.error(error);
    console.error("Connecting to Mongo");
  }
}

async function createDefaultAdmin(){
    try {
        

    } catch (error) {
        console.error("Error while creating Default admin");
        throw error;
    }
}

module.exports = { connect, createDefaultAdmin  };