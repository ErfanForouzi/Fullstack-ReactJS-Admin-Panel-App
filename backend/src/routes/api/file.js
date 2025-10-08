import express from "express";
import FileController from "../../controllers/api/file.js";
import uploader from "../../middlewares/uploader.js";
const router = express.Router();

router.post("/upload",uploader.single("file"),FileController.upload);

export default router;