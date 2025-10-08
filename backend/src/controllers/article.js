import Article from "../models/article.js";

const DEFAULT_PAGE_SIZE = 3;

class ArticleContorller {
  async list(req, res) {
    const { page = 1 } = req.query;
    const { rows: articles, count: totals } = await Article.findAndCountAll({
      include: ["user"],
      limit: DEFAULT_PAGE_SIZE,
      order: [["id", "DESC"]],
      offset: (page - 1) * DEFAULT_PAGE_SIZE,
    });
    res.render("article/list.ejs", {
      title: "Article List Page",
      articles,
      user: req.user,
      totals,
      page,
      pages: Math.ceil(totals / DEFAULT_PAGE_SIZE),
    });
  }
}

export default new ArticleContorller();