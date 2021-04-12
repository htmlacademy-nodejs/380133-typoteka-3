const {Router} = require(`express`);
const {getAPI} = require(`../api`);

const mainRouter = new Router();
const api = getAPI();

mainRouter.get(`/`, async (req, res) => {
  const [articles, categories] = await Promise.all([
    api.getArticles(),
    api.getCategories(),
  ]);

  const popularArticles = articles.sort((a, b) => b.comments.length - a.comments.length).slice(0, 4);

  return res.render(`./pages/main`, {articles, categories, popularArticles});
}
);

module.exports = mainRouter;
