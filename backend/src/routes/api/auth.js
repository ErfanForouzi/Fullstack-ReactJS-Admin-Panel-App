import express from "express";
import AuthController from "../../controllers/api/auth.js";
const router = express.Router();

router.post("/register",AuthController.register);
router.post("/login",AuthController.login);
router.get("/user",AuthController.user);
router.get("/users",AuthController.list);
router.get("/users/:id",AuthController.singleUser);
router.post("/get-access-token",AuthController.getAccessToken);
router.put("/users/:id",AuthController.update);
router.delete("/users/:id",AuthController.delete);

export default router;