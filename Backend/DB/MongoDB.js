import mongoose from "mongoose";

console.log("ENV Variables:", process.env);
console.log("MONGODB_URI:", process.env.MONGODB_URI);

const MongoDB_URI = process.env.MONGODB_URI;  // Yeh debug karne ke liye

console.log(MongoDB_URI, "YEH LE BHAI MONGODB KA URI");

export const mongooseConnection = async () => {
  
  try {
    await mongoose.connect(process.env.MongoDB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection error:', error.message);
  }
};