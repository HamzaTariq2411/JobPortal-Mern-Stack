import jobSchema from "../../model/jobSchema.js";

const deleteJobController = async (req, res) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return res.status(400).json({
      msg: "Job Seeker is not allowed to access this resource",
    });
  }

  const { id } = req.params;
  const job = await jobSchema.findById( id );

  if (!job) {
    return res.status(400).json({
      msg: "Job not found",
    });
  }

  await jobSchema.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    job,
    msg: "Job deleted successfully",
  });
};

export default deleteJobController;
