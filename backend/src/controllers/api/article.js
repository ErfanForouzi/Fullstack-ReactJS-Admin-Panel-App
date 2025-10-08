import Article from "../../models/article.js";
import { NotAuthorizeError, NotFoundError } from "../../utils/errors.js";
import { log } from "../../utils/logger.js";

const DEFAULT_PAGE_SIZE = 3;

class ArticleContorller {
  async list(req, res) {
    if (!req.user) {
      throw new NotAuthorizeError();
    }
    const { page = 1, limit = 4 } = req.query;
    const { rows: articles, count: totals } = await Article.findAndCountAll({
      include: ["user"],
      limit,
      order: [["id", "DESC"]],
      offset: (page - 1) * limit,
    });
    const pages = Math.ceil(totals / limit);

    return res.status(200).json({
      articles,
      totals,
      page: Number(page),
      pages,
      limit,
      offset: (page - 1) * limit,
      success: true,
    });
  }
  async get(req, res, next) {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) {
      throw new NotFoundError("مقاله مورد نظر یافت نشد");
    }
    return res.status(200).json({ article, success: true });
  }
  async create(req, res, next) {
    const { title, text, image } = req.body;
    const article = await Article.create({
      title,
      text,
      userId: req.user.id,
      image,
    });

    log({ message: "user:login", metadata: { id: req.user.id, role: req.user.role } });

    return res.status(201).json({
      success: true,
      article,
      message: "مقاله با موفقیت ساخته شد",
    });
  }
  async update(req, res, next) {
    const { id } = req.params;
    const { title, text, image } = req.body;
    const article = await Article.findByPk(id);
    if (!article) {
      throw new NotFoundError("مقاله مورد نظر یافت نشد");
    }
    article.title = title;
    article.text = text;
    article.image = image;

    await article.save();

    return res.status(200).json({
      success: true,
      article,
      message: "مقاله با موفقیت ویرایش شد",
    });
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) {
      throw new NotFoundError("مقاله مورد نظر یافت نشد");
    }

    await Article.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({
      success: true,
      article,
      message: "مقاله با موفقیت حذف شد",
    });
  }
}
export default new ArticleContorller();
