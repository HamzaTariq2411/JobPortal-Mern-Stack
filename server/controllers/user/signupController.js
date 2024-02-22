import bcrypt from "bcryptjs";
import { sendToken } from "../../utils/jwtToken.js";
import userModel from "../../model/userSchema.js";

const signupController = async (req, res) => {
  try {
    const { userName, email, password, phone, role } = req.body;
    if (!userName || !email || !password || !phone || !role) {
      return res.status(400).send({ msg: "Please fill all fields" });
    }
    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "Email already existed" });
    }
    // Hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    const userCreated = await userModel.create({
      userName,
      email,
      phone,
      role,
      password,
    });
    sendToken(userCreated, 200, res, "User registed successfully");
  } catch (error) {
    res.status(400).json({
      error
    })
    console.log(`Error in signup controller ${error}`);
  }
};

export default signupController;
