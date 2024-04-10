import {config} from 'dotenv'
config();
import morgan from 'morgan'
import express,{Response,Request} from 'express'
import mongoose from 'mongoose'
import CookieParser from 'cookie-parser'
import cors from 'cors'
import {googleRouter} from './googleController'


const app = express()
const FRONTEND_ORIGIN = process.env.FRONTENT_ORIGIN as string
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

app.use('/api/sessions/oauth/google',googleRouter)

app.listen(8000,async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/lap');
    }catch (e){
        console.log(e);
        console.log('database connection error');
        process.exit(1);
    }
    console.log('Listening ✔️');
})



