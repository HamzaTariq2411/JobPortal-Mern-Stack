import jobSchema from "../../model/jobSchema.js";


const getSingleJob =async(req,res)=>{
    const {id} =req.params;

    try {
        const job = await jobSchema.findById(id);
        if(!job){
            return res.status(404).json({msg:"Job Not Found"})
        }
        res.status(200).json({
            success:true,
            job,
        })
    } catch (error) {
        return res.status(400).json({
            msg:"Invalid Id/Cast Error"
        })
    }
}

export default getSingleJob;