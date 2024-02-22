import jobSchema from "../../model/jobSchema.js";

const updateJobsController = async (req, res) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return res.status(400).json({
      msg: "Job Seeker is not allowed to access this resource",
    });
  }

  const {id} = req.params;
  let job = await jobSchema.findById( id );;

  if(!job){
    return res.status(400).json({
        msg: "Job not found",
      });
  }

  job = await jobSchema.findByIdAndUpdate(id, req.body,{
    new:true,
    runValidators:true,
    useFindAndmodify:false,
  })
  res.status(200).json({
    success:true,
    job,
    msg: "Job update successfully",
  });
};

export default updateJobsController;
