import applicationModel from "../../model/applicationSchema.js";

const jobseekerGetApplicationController = async (req, res) => {
  try {
    const { role } = req.user;
  if (role === "Employer") {
    return res.status(400).json({
      msg: "Employer is not allowed to access this resource",
    });
  }

  const { _id } = req.user;
  const application = await applicationModel.find({'applicantId.user':_id});
  res.status(200).json({
    success: true,
    application,
  });
  } catch (error) {
    console.log(`Error in getAllApplication controller ${error}`);
  }
};

export default jobseekerGetApplicationController;
