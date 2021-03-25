const {Router} = require(`express`);
const {validateArticle} = require(`../middlewares/validateArticle`);
const {HttpCode, ServerMessage} = require(`../constants`);

const router = new Router();

// @todo Move to controllers
const getArticle = (service, req, res) => {
  const article = service.findOne(req.params.articleId);

  if (!article) {
    return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
  }

  return article;
};

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, router);


  router.get(`/:articleId`, (req, res) => {
    const article = getArticle(articleService, req, res);

    return res.status(HttpCode.OK).send(article);
  });

  router.get(`/:articleId/comments`, (req, res) => {
    const article = getArticle(articleService, req, res);

    const comments = commentService.findAll(article);

    if (!comments) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(comments);
  });

  router.post(`/:articleId/comments`, (req, res) => {
    const {text} = req.body;

    const article = getArticle(articleService, req, res);
    const createdComment = commentService.create(text, article);

    if (!createdComment) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(createdComment);
  });

  router.get(`/:articleId/comments/:commentId`, (req, res) => {
    const {commentId} = req.params;

    const article = getArticle(articleService, req, res);
    const comment = commentService.findOne(commentId, article);

    if (!comment) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(comment);
  });

  router.delete(`/:articleId/comments/:commentId`, (req, res) => {
    const {commentId} = req.params;

    const article = getArticle(articleService, req, res);
    const deletedComment = commentService.delete(commentId, article);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(deletedComment);
  });

  router.get(`/`, (req, res) => {
    const articles = articleService.findAll();
    return res.status(HttpCode.OK).send(articles);
  });

  router.put(`/:articleId`, (req, res) => {
    const {articleId} = req.params;

    const updatedArticle = articleService.update(articleId, req.body);

    if (!updatedArticle) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(updatedArticle);
  });

  router.delete(`/:articleId`, (req, res) => {
    const deletedArticle = articleService.delete(req.params.articleId);

    if (!deletedArticle) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(deletedArticle);
  });

  router.post(`/`, validateArticle, (req, res) => {
    const article = articleService.create(req.body);

    return res.status(HttpCode.OK).send(article);
  });
};
