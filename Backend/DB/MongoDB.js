import { mongoose } from "mongoose";

const mongoURI = 'mongodb://localhost:27017/Chat-App-DB';

export const mongooseConnection = async () => {
  try {
    await mongoose.connect(mongoURI)
    console.log('MongoDB connected')
  }
  catch (error) { console.log('MongoDB connection error:', error.message) };
}

