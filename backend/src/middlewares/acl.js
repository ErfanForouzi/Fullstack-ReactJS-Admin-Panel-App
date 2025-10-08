import { ROLE_HIERARCHY } from "../config/roles.js";
import { ForbidenError, NotAuthorizeError } from "../utils/errors.js"

export default function acl(roleName){
    return (req,res,next)=>{
        if(!req.user){
            throw new NotAuthorizeError()
        }
        const {role} = req.user;
        console.log(req.user);
        if(role === roleName || ROLE_HIERARCHY[role].includes(roleName)){
            return next()
        }
        throw new ForbidenError()
    }
}