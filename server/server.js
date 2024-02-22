import express from 'express'
import cors from 'cors'
import connectToDB from './database/db.js';
import { Port } from './config/index.js';
import authRoute from './routers/authRoute.js';
import cookieParser from 'cookie-parser';
import jobRoute from './routers/jobRoute.js';
import applicationRoute from './routers/applicationRoute.js';


const app = express();

const corsOption ={
    origin:"http://localhost:3000",
    methods:"GET, PUT, DELETE, POST, PATCH, HEAD",
    credentials: true,
}

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use("/CV",express.static("CV"))



app.use('/api',authRoute);
app.use('/api',jobRoute);
app.use('/api',applicationRoute);

connectToDB();

app.listen(Port,()=>{
    console.log(`Server is runnig on port ${Port}`);
})
