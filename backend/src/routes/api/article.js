import express from "express";
import ArticleContorller from "../../controllers/api/article.js";
import acl from "../../middlewares/acl.js";
import { validate } from "express-jsonschema";
import { createArticleSchema } from "../../validators/article.js";
const router = express.Router();

router.get("/",acl('USER'),ArticleContorller.list);
router.get("/:id",acl('USER'),ArticleContorller.get);
router.post("/",acl('WRITER'),validate(createArticleSchema),ArticleContorller.create);
router.put("/:id",acl("MODERATOR"),ArticleContorller.update);
router.delete("/:id",acl("ADMIN"),ArticleContorller.delete);

export default router;