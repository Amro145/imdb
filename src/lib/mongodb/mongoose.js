import mongoose from 'mongoose';
export const connect = async () => {
  mongoose.set('strictQuery', true);

  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB already connected');
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'next-imdb-clerk',
    });
    console.log('MongoDB connected successfully');

  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};