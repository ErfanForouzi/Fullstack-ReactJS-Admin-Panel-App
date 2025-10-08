import express from "express";
import general from "./general.js";
import admin from "./admin/index.js";
import auth from "./auth.js";
import article from "./article.js";
import api from "./api/index.js";
import { NotFoundError } from "../utils/errors.js";

const router = express.Router();

router.use("/",general);
router.use("/",auth);
router.use("/article",article);
router.use("/admin",admin);
router.use("/api",api);

router.all(/^.*$/,(req, res, next) => { 
  throw new NotFoundError()
});

export default router;
