const {Router} = require(`express`);
const {checkIsArticleExists} = require(`../middlewares/checkIsArticleExists`);
const {validateArticle} = require(`../middlewares/validateArticle`);
const {HttpCode, ServerMessage} = require(`../constants`);

const router = new Router();

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, router);

  router.get(`/:articleId`, checkIsArticleExists(articleService), (req, res) =>
    res.status(HttpCode.OK).send(res.locals.article));

  router.get(`/:articleId/comments`, checkIsArticleExists(articleService), (req, res) => {
    const comments = commentService.findAll(res.locals.article);

    if (!comments) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(comments);
  });

  router.post(`/:articleId/comments`, checkIsArticleExists(articleService), (req, res) => {
    const {text} = req.body;
    const createdComment = commentService.create(text, res.locals.article);

    if (!createdComment) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(createdComment);
  });

  router.delete(`/:articleId/comments/:commentId`, checkIsArticleExists(articleService), (req, res) => {
    const {articleId, commentId} = req.params;

    const article = commentService.drop(commentId, res.locals.article);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    const updatedArticle = articleService.update(articleId, {comments: article.comments});

    return res.status(HttpCode.OK).send(updatedArticle);
  });

  router.get(`/`, (req, res) => {
    const articles = articleService.findAll();
    return res.status(HttpCode.OK).send(articles);
  });

  router.put(`/:articleId`, checkIsArticleExists(articleService), (req, res) => {
    const {articleId} = req.params;
    const updatedArticle = articleService.update(articleId, req.body);

    return res.status(HttpCode.OK).send(updatedArticle);
  });

  router.delete(`/:articleId`, checkIsArticleExists(articleService), (req, res) => {
    const deletedArticle = articleService.drop(req.params.articleId);

    return res.status(HttpCode.OK).send(deletedArticle);
  });

  router.post(`/`, validateArticle, (req, res) => {
    const article = articleService.create(req.body);

    return res.status(HttpCode.OK).send(article);
  });
};
