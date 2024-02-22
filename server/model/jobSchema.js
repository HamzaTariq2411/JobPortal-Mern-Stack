import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Job title is required"],
    minLength: [3, "Job title must contain 3 characters"],
    maxLength: [50, "Job title cannot exceed 50 charactera"],
  }, 
  description: {
    type: String,
    required: [true, "Job discription is required"],
    minLength: [20, "Job title must contain 20 characters"],
  },
  category: {
    type: String,
    required: [true, "Job category is required"],
  },
  country: {
    type: String,
    required: [true, "Job country is required"],
  },
  city: {
    type: String,
    required: [true, "Job city is required"],
  },
  location: {
    type: String,
    required: [true, "Please provide exact location"],
  },
  expectedSalary: {
    type: Number,
    minLength: [2, "Job salary must contain 2 characters"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPosted: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
});

const jobModel = mongoose.model("Job", jobSchema);

export default jobModel;
