import jobSchema from "../../model/jobSchema.js";

const getmyJobsController = async (req, res) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return res.status(400).json({
      msg: "Job Seeker is not allowed to access this resource",
    });
  }

  const myJobs = await jobSchema.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
};

export default getmyJobsController;
