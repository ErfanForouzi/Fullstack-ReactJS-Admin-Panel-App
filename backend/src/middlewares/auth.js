import jwt from "jsonwebtoken"
import { NotAuthorizeError } from "../utils/errors.js";
export default (req,res,next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization;
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(error,payload)=>{
            if(error){
                throw new NotAuthorizeError(error)
            }
            req.user = payload
            next()
        })
    }else{
        req.user = req.session.user;
        next()
    }
}