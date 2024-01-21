const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `MongoDb connected to..  ${mongoose.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(` MONGO Connect Error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
