import jwt from 'jsonwebtoken'
import { JwtKey } from "../config/index.js";
import userModel from '../model/userSchema.js';

export const isAuthorize = async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return res.status(400).send({
            msg:"user not authorize"
        })
    }
    const decoded = jwt.verify(token,JwtKey);
    req.user = await userModel.findOne({email:decoded.email});

    next();
}