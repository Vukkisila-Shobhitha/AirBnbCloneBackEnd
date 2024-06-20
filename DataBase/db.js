const mongoose = require("mongoose");

const dbConnect = () => {
    mongoose.set('strictQuery', false);
    mongoose
      .connect(process.env.MONGO_URL, {
        // Remove useNewUrlParser and useUnifiedTopology
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      })
      .then(() => {
        console.log(`DB connected`);
      })
      .catch((err) => {
        console.log(`DB not connected`);
        console.error(err);
        process.exit(1);
      });
};

module.exports = dbConnect;