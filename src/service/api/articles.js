const {Router} = require(`express`);
const {checkIsArticleExists} = require(`../middlewares/checkIsArticleExists`);
const {validateArticle} = require(`../middlewares/validateArticle`);
const {HttpCode, ServerMessage} = require(`../constants`);

const router = new Router();

module.exports = (app, service) => {
  app.use(`/articles`, router);

  router.get(`/:articleId`, (req, res) => {
    const article = service.findOne(req.params.articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(article);
  });

  router.get(`/`, (req, res) => {
    const articles = service.findAll();
    return res.status(HttpCode.OK).send(articles);
  });

  router.put(`/:articleId`, checkIsArticleExists(service), (req, res) => {
    const {articleId} = req.params;
    const updatedArticle = service.update(articleId, req.body);

    return res.status(HttpCode.OK).send(updatedArticle);
  });

  router.delete(`/:articleId`, checkIsArticleExists(service), (req, res) => {
    const deletedArticle = service.drop(req.params.articleId);

    return res.status(HttpCode.OK).send(deletedArticle);
  });

  router.post(`/`, validateArticle, (req, res) => {
    const article = service.create(req.body);

    return res.status(HttpCode.OK).send(article);
  });
};
