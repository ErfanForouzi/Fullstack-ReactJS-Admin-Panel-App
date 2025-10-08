import express from "express";
import {home,about} from "../controllers/general.js"; 

const router  = express.Router();

router.route("/").get(home)
router.route("/about").get(about);

export default router