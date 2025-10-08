import path from "path";
import express from "express";
import session from "express-session";
import cors from "cors";
import { sequelize } from "./config/database.js";
import redisStore from "./config/redis.js";
import auth from "./middlewares/auth.js";
import errorHandler from "./middlewares/error-handler.js";
import routes from "./routes/index.js";





const app = express();




await sequelize.authenticate()
await sequelize.sync()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.set("view engine","ejs")
app.set("views",path.join(import.meta.dirname,'views'))

app.use(session({
    resave:false,
    saveUninitialized:true,
    store:redisStore,
    secret:process.env.SESSION_SECRET
}))

app.use(auth)
app.use(routes)
app.use(errorHandler)


app.listen(3000,()=>{
    console.log('server running on port 3000');
})