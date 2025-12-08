const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/spotify-music');
    console.log(`MongoDB conectado com sucesso: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Erro ao conectar no MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;