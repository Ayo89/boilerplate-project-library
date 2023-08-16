const mongoose = require('mongoose')

const base_url = process.env.MONGO_URL

const connectDB = async () => {
  try {
  mongoose.connect(base_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.once("open", () => {
    console.log("Conectado a MongoDB");
  });
  } catch (error) {
      mongoose.connection.on("error", (error) => {
        console.error("Error de conexión a MongoDB:", error);
      });
  }
}

module.exports = {
  connectDB
}