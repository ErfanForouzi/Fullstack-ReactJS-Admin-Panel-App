import express from "express";
import AuthController from "../controllers/auth.js"; 

const router  = express.Router();

router.route("/register").get(AuthController.registerPage)
router.route("/register").post(AuthController.register)
router.route("/login").get(AuthController.loginPage)
router.route("/login").post(AuthController.login)
router.route("/logout").get(AuthController.logout)

export default router