import mongoose from 'mongoose';


export const mongooseConnection = async () => {
  try {
    await mongoose.connect('mongodb+srv://shashankkumar8558:m4BKB5eGow7baxGs@shashank.t5vlnba.mongodb.net/Chat-App-DB?retryWrites=true&w=majority&appName=Shashank');
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection error:', error.message);
  }
};
