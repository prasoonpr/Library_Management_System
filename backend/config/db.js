import mongoose from 'mongoose';

export const connectDb = async (URI) => {
  mongoose.connection.on('connected', () => {
    console.log('✅ Connected to database');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('❌ Disconnected from database');
  });

  try {
    await mongoose.connect(URI, {
    });
  } catch (error) {
    console.error('❗ Database connection error:', error);
  }
};
