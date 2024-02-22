import jobSchema from "../../model/jobSchema.js";

const getJobController = async (req, res) => {
  const jobs = await jobSchema.find({ expired: false });
  res.status(200).json({
    succes: true,
    jobs,
  });
};

export default getJobController;
