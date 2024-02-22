import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JwtKey } from "../config/index.js";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: [true, "userName is required"],
    minLength: [3, "Name must contain at least 3 characters"],
    maxLength: [30, "Name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    validate: [validator.isEmail, "PLease provide valid email"],
    unique: [true, "Email already existed"],
  },
  phone: {
    type: Number,
    require: [true, "Phone number is required"],
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    minLength: [8, "Name must contain at least 8 characters"],
    maxLength: [32, "Name cannot exceed 32 characters"],
    select:false
  },
  role: {
    type: String,
    require: [true, "Please provide your role"],
    enum: ["Employer", "Job Seeker"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare Password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Generate Token
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        // userId: this._id,
        userId: this._id.toString(),
        userName: this.userName,
        email: this.email,
        role:this.role,
      },
      JwtKey,
      {
        expiresIn: "1d",
      }
    );
  } catch (error) {
    console.log(`Error in generate token code ${error}`);
  }
};

const userModel = mongoose.model("User", userSchema);

export default userModel;