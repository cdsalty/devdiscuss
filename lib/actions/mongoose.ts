import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true); // used to prevent unknown field queries and improves the developer experience

  if (!process.env.MONGODB_URL)
    return console.log(
      'Looks like we are MISSING THE MONGODB_URL. Please double check.'
    );

  if (isConnected) return console.log('MongoDB is already connected');

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'devdiscuss',
    });

    isConnected = true;

    console.log('MongoDB is connected');
  } catch (error) {
    console.log('MongoDB connection FAILED TO CONNECT:', error);
  }
};
