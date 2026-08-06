const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  const dbUri = process.env.MONGODB_URI;

  if (!dbUri) {
    console.warn('[MongoDB Warning] MONGODB_URI is missing in environment variables.');
    return;
  }

  try {
    const db = await mongoose.connect(dbUri, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout for fast error feedback
    });

    isConnected = db.connections[0].readyState === 1;
    console.log(`[MongoDB] Connected successfully: ${db.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Connection Error] ${error.message}`);
    isConnected = false;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('[MongoDB] Disconnected from database.');
  isConnected = false;
});

mongoose.connection.on('error', (err) => {
  console.error(`[MongoDB Runtime Error] ${err.message}`);
});

module.exports = connectDB;
