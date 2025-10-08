import multer from "multer";
import { BadRequestError } from "../utils/errors.js";

const validMimeTypes = ["image/jpg","image/webp","image/jpeg"]

const storage = multer.diskStorage({
    destination:"./public/uploads",
    filename:(req,file,cb)=>{
        const filename =`${Date.now()}-${file.originalname.replace(/\s/g,"")}`;
        cb(null,filename)
    }
})

const fileFilter = (req,file,cb)=>{
    if(validMimeTypes.includes(file.mimetype)){
        cb(null,file)
    }else{
        cb(new BadRequestError('فرمت عکس شما باید jpg/jpeg/webp باشد'),false)
    }
}


const uploader = multer({
    limits:{
        fileSize:3 * 1024 *1024
    },
storage,
fileFilter
});

export default uploader