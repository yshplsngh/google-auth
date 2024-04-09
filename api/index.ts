const FRONTEND_ORIGIN = 'http://localhost:5173'


import morgan from 'morgan'
import express,{Response,Request} from 'express'
const app = express()

import mongoose from 'mongoose'
import CookieParser from 'cookie-parser'
import authRouter from "./checkLogin";
import cors from 'cors'
app.use(express.json({limit:"5KB"}))
app.use(CookieParser());
app.use(morgan('dev'))
app.use(
    cors({
        credentials: true,
        origin: [FRONTEND_ORIGIN],
    })
);


app.get('/',(req:Request,res:Response)=>{
    res.status(200).send({
        uptime:process.uptime()
    })
})
app.use('/auth',authRouter)




app.listen(3000,async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/lap');
    }catch (e){
        console.log(e);
        console.log('database connection error');
    }
    console.log('Listening ✔️');
})



