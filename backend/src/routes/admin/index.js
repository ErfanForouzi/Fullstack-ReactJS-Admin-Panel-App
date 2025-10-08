import express from "express";
import article from "./article.js";

const router = express.Router();

router.use("/article",article)

export default router