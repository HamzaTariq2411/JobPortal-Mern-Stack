import jobSchema from "../../model/jobSchema.js";

const jobController = async (req, res) => {
 try {
  const  {role}  = req.user;
  if (role === "Job Seeker") {
    return res.status(400).json({
      msg: "Job Seeker is not allowed to access this resource",
    });
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    expectedSalary,
  } = req.body;

  if (
    !title ||
    !description ||
    !category ||
    !country ||
    !city ||
    !location ||
    !expectedSalary
  ) {
    return res.status(400).json({
      msg: "Please provide all job details",
    });
  }
  const jobExist = await jobSchema.findOne({ title,
    description,
    category,
    country,
    city,
    location,
    expectedSalary, });

    if (jobExist) {
        return res.status(400).json({ msg: "Job already existed" });
      }

  const postedBy = req.user._id;
  const job = await jobSchema.create({
    title,
    description,
    category,
    country,
    city,
    location,
    expectedSalary,
    postedBy,
  })
  res.status(200).json({
    success:true,
    msg:"Job posted Successfully",
    job,
  })
 } catch (error) {
  res.status(400).json({
    error
  })
 }
};

export default jobController;
