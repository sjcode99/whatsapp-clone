const mongoose = require("mongoose");

const connectWithDb = () => {
  mongoose
    // .connect(process.env.DB_URL, {
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB CONNECTED SUCCESSFULLY"))
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectWithDb;
