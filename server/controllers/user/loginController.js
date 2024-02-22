import userModel from '../../model/userSchema.js';
import { sendToken } from '../../utils/jwtToken.js';


const loginController = async (req,res,next) =>{
    try {
        const {email,password,role} = req.body;
        if (!email || !password || !role) {
            return res.status(400).send({ msg: "Please fill all fields" });
          }
        const userExist = await userModel.findOne({email}).select("+password");

        if(!userExist){
            return res.status(400).json({msg:"Invalid Credenrials"})
        }

        const ispasswordValid = await userExist.comparePassword(password);

        if(!ispasswordValid){
            return res.status(400).json({msg:"Invalid Credenrials"})
        }
        if(userExist.role !== role){
            return res.status(400).json({msg:"User with this role not found"})
        }
        sendToken(userExist,200,res,"Login Successfully")
    } catch (error) {
        res.status(400).json({error})
        console.log(`Error in login controller ${error}`);
    }
}

export default loginController;

