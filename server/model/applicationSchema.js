import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [3, "Name must contain 3 characters"],
    maxLength: [30, "Name cannot exceed 50 charactera"],
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    validate: [validator.isEmail, "Please provide valid email"],
  },
  phone: {
    type: Number,
    require: [true, "Phone number is required"],
  },
  resume:{
    type:String
  },
  // resume: {
  //   public_id: {
  //     type: String,
  //     require: true,
  //   },
  //   url:{
  //       type: String,
  //     require: true,
  //   },    
  // },
  applicantId:{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    role:{
        type: String,
        enum:["Job Seeker"],
        require:true
    }
  },
  employerId:{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    role:{
        type: String,
        enum:["Employer"],
        require:true
    }
  },
  jobID:{
    type:String
  }
});

const applicationModel = mongoose.model("Application",applicationSchema)

export default applicationModel;
