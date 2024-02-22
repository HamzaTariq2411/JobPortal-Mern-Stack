import applicationModel from "../../model/applicationSchema.js";
import jobModel from "../../model/jobSchema.js";
import nodemailer from 'nodemailer'
import {myEmail, myPassword} from '../../config/index.js'


const postApplicationController = async (req, res) => {
  try {
    const { role } = req.user;
    if (role === "Employer") {
      return res.status(400).json({
        msg: "Employer is not allowed to access this resource",
      });
    }

    const { name, email, phone, jobId } = req.body;
    const resume = req.file.filename;

    // Send email functionality
    const transporter = nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:myEmail,
        pass:myPassword
      }
    })

    const mailOptions ={
      from:myEmail,
      to:email,
      subject:"Confirmation",
      html:`<h2>${name} your application submitted successfully.</h2>`
    }

    transporter.sendMail(mailOptions,(err,info)=>{
      if(err){
        console.log("Error",err);
      }
    })

    
    const applicantId = {
      user: req.user._id,
      role: "Job Seeker",
    };
    if (!jobId) {
      return res.status(404).json({
        msg: "Job not found",
      });
    }
    
    const jobDetails = await jobModel.findById(jobId);
    if (!jobDetails) {
      return res.status(404).json({
        msg: "Job not found",
      });
    }

    const employerId = {
      user: jobDetails.postedBy,
      role: "Employer",
    };
    const JobID = jobDetails._id.valueOf();
    
    if (!name || !email || !phone || !applicantId || !employerId) {
      return res.status(400).json({
        msg: "Please fill all fields",
      });
    }
    const application = await applicationModel.create({
      name,
      email,
      phone,
      resume,
      applicantId,
      employerId,
      jobID:JobID,
    });
    res.status(200).json({
      success: true,
      msg: "Application Submitted!",
      application,
    });
  } catch (error) {
   res.status(404).json({
      msg: error,
    });
    
    console.log(`Error in post Application controller ${error}`);
  }
};

export default postApplicationController;
