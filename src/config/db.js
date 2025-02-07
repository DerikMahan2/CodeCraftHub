const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) { // Fix: Define 'error' in the catch block
    console.error('MongoDB connection failed:', error.message); // Now 'error' is defined here
    process.exit(1);  // Exit the process if connection fails
  }
};

module.exports = connectDB;