const {Router} = require(`express`);
const {validateArticle} = require(`../middlewares/validateArticle`);
const {validateComment} = require(`../middlewares/validateComment`);
const {HttpCode, ServerMessage} = require(`../constants`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger({name: `api/articles`});

module.exports = (app, articleService, commentService) => {
  const router = new Router();

  app.use(`/articles`, router);

  router.get(`/:articleId/comments/:commentId`, (req, res) => {
    const {commentId, articleId} = req.params;

    const article = articleService.findOne(articleId);

    if (!article) {
      logger.error(`${ServerMessage.NOT_FOUND_MESSAGE} article ${req.url}`);
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    const comment = commentService.findOne(commentId, article);

    if (!comment) {
      logger.error(`${ServerMessage.NOT_FOUND_MESSAGE} comment ${req.url}`);
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(comment);
  });

  router.delete(`/:articleId/comments/:commentId`, (req, res) => {
    const {commentId, articleId} = req.params;

    const article = articleService.findOne(articleId);

    if (!article) {
      logger.error(`${ServerMessage.NOT_FOUND_MESSAGE} article ${req.url}`);
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    const deletedComment = commentService.delete(commentId, article);

    if (!deletedComment) {
      logger.error(`${ServerMessage.NOT_FOUND_MESSAGE} comment ${req.url}`);
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(deletedComment);
  });

  router.get(`/:articleId/comments`, (req, res) => {
    const article = articleService.findOne(req.params.articleId);

    if (!article) {
      logger.error(`${ServerMessage.NOT_FOUND_MESSAGE} article ${req.url}`);
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    const comments = commentService.findAll(article);

    if (!comments) {
      logger.error(`${ServerMessage.NOT_FOUND_MESSAGE} comment ${req.url}`);
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(comments);
  });

  router.post(`/:articleId/comments`, validateComment, (req, res) => {
    const article = articleService.findOne(req.params.articleId);

    if (!article) {
      logger.error(`${ServerMessage.NOT_FOUND_MESSAGE} article ${req.url}`);
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    const createdComment = commentService.create(req.body.text, article);

    if (!createdComment) {
      logger.error(`${ServerMessage.NOT_FOUND_MESSAGE} comment ${req.url}`);
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.CREATED).send(createdComment);
  });

  router.get(`/:articleId`, (req, res) => {
    const article = articleService.findOne(req.params.articleId);

    if (!article) {
      logger.error(`${ServerMessage.NOT_FOUND_MESSAGE} article ${req.url}`);
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(article);
  });

  router.put(`/:articleId`, validateArticle, (req, res) => {
    const {articleId} = req.params;

    const updatedArticle = articleService.update(articleId, req.body);

    if (!updatedArticle) {
      logger.error(`${ServerMessage.NOT_FOUND_MESSAGE} article ${req.url}`);
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(updatedArticle);
  });

  router.delete(`/:articleId`, (req, res) => {
    const deletedArticle = articleService.delete(req.params.articleId);

    if (!deletedArticle) {
      logger.error(`${ServerMessage.NOT_FOUND_MESSAGE} article ${req.url}`);
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(deletedArticle);
  });

  router.get(`/`, (req, res) => {
    const articles = articleService.findAll();
    return res.status(HttpCode.OK).send(articles);
  });

  router.post(`/`, validateArticle, (req, res) => {
    const article = articleService.create(req.body);
    return res.status(HttpCode.CREATED).send(article);
  });
};
