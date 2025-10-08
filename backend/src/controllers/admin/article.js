import Article from "../../models/article.js";
import { NotFoundError } from "../../utils/errors.js";

const DEFAULT_PAGE_SIZE = 3;
class ArticleController {
  async list(req, res, next) {
    const { page = 1 ,limit=4 } = req.query;
    const { rows: articles, count: totals } = await Article.findAndCountAll({
      include: ["user"],
      limit,
      order: [["id", "ASC"]],
      offset: (page - 1) * limit,
    });
    res.render("admin/article/list.ejs", {
      title: "Article List Page",
      articles,
      user: req.user,
      totals,
      page,
      pages: Math.ceil(totals / limit),
    });
  }
  async get(req, res, next) {
    const { id } = req.params;
    const article = await Article.findOne({ id });
    if (!article) {
      throw new NotFoundError("Article Not Found");
    }
    res.render("admin/article/detail.ejs", {
      title: "Article Details Page",
      article,
    });
  }
  create(req, res, next) {
    res.render("admin/article/create.ejs", {
      title: "Create Article Page",
      user: req.user,
    });
  }
  async add(req, res, next) {
    const { title, text } = req.body;
    const image = req?.file?.path.substring(7);


    await Article.create({ title, text, userId: req.user.id,image });
    return res.redirect("/admin/article");
  }

  async edit(req, res, next) {
    const { id } = req.params;
    const article = await Article.findOne({ id });
    if (!article) {
      throw new NotFoundError("Article Not Found");
    }
    res.render("admin/article/edit.ejs", {
      title: `Article Edit Page ${article.title}`,
      article,
      user: req.user,
    });
  }
  async update(req, res, next) {
    const { id } = req.params;
    const { title, text } = req.body;
    
    const image = req?.file?.path.substring(7);

    const article = await Article.findOne({ id });
    if (!article) {
      throw new NotFoundError("Article Not Found");
    }
    article.title = title;
    article.text = text;
    article.image = image;
    res.redirect(`/admin/article/${article.id}`);
  }
  async delete(req, res, next) {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) {
      throw new NotFoundError("Article Not Found");
    }

    await Article.destroy({
      where:{id}
    })
    res.redirect(`/admin/article`);
  }
}

export default new ArticleController();
