import express from "express";

const router = express.Router();
import ArticleController from "../../controllers/admin/article.js";
import uploader from "../../middlewares/uploader.js";

router.get("/", ArticleController.list);
router.get("/create", ArticleController.create);
router.post("/add", uploader.single("file"), ArticleController.add);
router.get("/:id", ArticleController.get);
router.get("/edit/:id", ArticleController.edit);
router.put("/:id", ArticleController.update);
router.delete("/:id", ArticleController.delete);

export default router