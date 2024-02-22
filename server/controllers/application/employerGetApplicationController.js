import applicationModel from "../../model/applicationSchema.js";

const employerGetApplicationController = async (req, res) => {
  try {
    const { role } = req.user;
  if (role === "Job Seeker") {
    return res.status(400).json({
      msg: "Job Seeker is not allowed to access this resource",
    });
  }

  const { _id } = req.user;
  const application = await applicationModel.find({'employerId.user':_id});
  res.status(200).json({
    success: true,
    application,
  });
  } catch (error) {
    console.log(`Error in getAllApplication controller ${error}`);
  }
};

export default employerGetApplicationController;
