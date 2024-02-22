import mongoose from 'mongoose'
import { Mongo_Url } from '../config/index.js';

const connectToDB = () =>{
    try {
        const conn = mongoose.connect(Mongo_Url);
        console.log("Connect to Database");
    } catch (error) {
        console.log('Error in db.js',error);
    }
}
export default connectToDB;
