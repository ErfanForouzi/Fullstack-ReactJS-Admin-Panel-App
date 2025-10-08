import express from "express";
import article from "./article.js";
import auth from "./auth.js";
import file from "./file.js";
const router = express.Router();

router.use("/article",article);
router.use("/file",file);
router.use("/",auth);

export default router;