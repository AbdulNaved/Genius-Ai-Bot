// app/models/userModel.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: { type: String, required: false }, // Set as optional
});

// Export the User model
export const User = mongoose.models.User || mongoose.model("User", userSchema);


// import mongoose from 'mongoose';
// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true},
//     email: { type: String, required: true},
//     image: {type: String},
//     password: { type: String, required: true, select: false},
//     googleId: { type: String, required: true},
//     isVerified: {type: Boolean, default: false},
// })

// export const User = mongoose.models?.User || mongoose.model("User", userSchema);


