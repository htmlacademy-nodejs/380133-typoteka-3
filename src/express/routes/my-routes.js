const {Router} = require(`express`);
const {getAPI} = require(`../api`);

const myRouter = new Router();
const api = getAPI();

myRouter.get(`/comments`, async (req, res) => {
  const articles = await api.getArticles();
  return res.render(`./pages/my-comments`, {articles: articles.slice(0, 3)});
});

myRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  return res.render(`./pages/my`, {articles});
});


module.exports = myRouter;
