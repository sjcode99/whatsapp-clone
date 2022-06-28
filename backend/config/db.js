const mongoose = require("mongoose");

const connectWithDb = () => {
  mongoose
    .connect('mongodb+srv://admin:TuAFA3Be1aVnJsNg@cluster0.hyx9ps1.mongodb.net/whatsappdb?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB CONNECTED SUCCESSFULLY"))
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectWithDb;
