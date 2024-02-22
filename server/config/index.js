import dotenv from "dotenv";

dotenv.config();

const Port = process.env.PORT || 8000;
const Mongo_Url = process.env.MONGO_URL;
const JwtKey = process.env.JWT_KEY;


const myEmail= process.env.Email
const myPassword= process.env.Password

export { Port, Mongo_Url, JwtKey,myEmail,myPassword };
