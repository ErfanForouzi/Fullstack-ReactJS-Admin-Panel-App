import User from "../models/user.js";
import { BadRequestError } from "../utils/errors.js";
import bcrypt from "bcrypt"

class AuthController{
    registerPage(req,res){
        if(req.user){
          return res.redirect('/') 
        }
        return res.render("auth/register",{
            title:"Register Page"
        })
    }
    async register(req,res){
        if(req.user){
            return res.redirect('/') 
          }
        const {username,password} = req.body;
        if(!username || !password){
            throw new BadRequestError("Username and Password are required");
        }
        let user;
        try {
            const hashedPassword = bcrypt.hashSync(password,12)
            user = await User.create({username,password:hashedPassword})
            return res.redirect("/")
        } catch (error) {
            if(error?.original?.code==="ER_DUP_ENTRY"){
                throw new BadRequestError("Username is duplicated")
            }else{
                throw error
            }
        }
    }
    loginPage(req,res){
        if(req.user){
            return res.redirect('/') 
          }
        return res.render("auth/login",{
            title:"Login Page"
        })
    }
    async login(req,res){
        if(req.user){
            return res.redirect('/') 
          }
        const {username,password} = req.body;
        if(!username || !password){
            throw new BadRequestError("Username and Password are required");
        }

        console.log(username,password);
        const user = await User.scope("withPassword").findOne({where:{username}})
        console.log(user);
        if(!user){
            throw new BadRequestError("Credential Error")
        }
        if(!bcrypt.compareSync(password,user.password)){
            throw new BadRequestError("username or password is not correct")
        }
        user.setDataValue("password",undefined)

        req.session.user = user;
        res.redirect("/")
    }
    logout(req,res){
        req.session.destroy(error=>{
            if(!error){
                res.redirect(req.headers.referer)
            }else{
                throw error
            }
        })
    }
}
export default new AuthController()