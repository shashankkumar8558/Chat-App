import mongoose from 'mongoose';

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  confirmPassword: {
    type: String,
    minlength: 6,
  },
  profilePicture: {
    type: String, // You can adjust this based on how you handle profile pictures (e.g., URL or file path)
    default: "",
  },
  //createdAt, updatedAt ==> Member since <createdAt>
}, { timestamps: true });

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

export default User;
