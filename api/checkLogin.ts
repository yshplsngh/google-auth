import express,{Request,Response} from "express";
const router = express.Router()


router.post('/login',(req:Request,res:Response)=>{
    console.log(req.body)
    res.status(200).send('working');
})

export default router