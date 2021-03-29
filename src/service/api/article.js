const {Router} = require(`express`);
const {validateArticle} = require(`../middlewares/validateArticle`);
const {validateComment} = require(`../middlewares/validateComment`);
const {HttpCode, ServerMessage} = require(`../constants`);

const router = new Router();

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, router);

  router.get(`/:articleId/comments/:commentId`, (req, res) => {
    console.log(`router`);
    const {commentId, articleId} = req.params;

    const article = articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    const comment = commentService.findOne(commentId, article);

    if (!comment) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(comment);
  });

  router.delete(`/:articleId/comments/:commentId`, (req, res) => {
    const {commentId, articleId} = req.params;

    const article = articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    const deletedComment = commentService.delete(commentId, article);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(deletedComment);
  });
  // PROCESS
  router.get(`/:articleId/comments`, (req, res) => {
    console.log(`COMMENTS GET`);
    const article = articleService.findOne(req.params.articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    const comments = commentService.findAll(article);

    if (!comments) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(comments);
  });

  router.post(`/:articleId/comments`, validateComment, (req, res) => {
    console.log(`router`);
    const article = articleService.findOne(req.params.articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    const createdComment = commentService.create(req.body.text, article);

    if (!createdComment) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.CREATED).send(createdComment);
  });
  // DONE
  router.get(`/:articleId`, (req, res) => {
    console.log(`router`);
    const article = articleService.findOne(req.params.articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(article);
  });
  // DONE
  router.put(`/:articleId`, validateArticle, (req, res) => {
    console.log(`router PUT /:articleId`);
    const {articleId} = req.params;

    const updatedArticle = articleService.update(articleId, req.body);

    if (!updatedArticle) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(updatedArticle);
  });
  // DONE
  router.delete(`/:articleId`, (req, res) => {
    console.log(`DELETE id`);
    const deletedArticle = articleService.delete(req.params.articleId);

    if (!deletedArticle) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(deletedArticle);
  });
  // DONE
  router.get(`/`, (req, res) => {
    console.log(`router GET /`);

    const articles = articleService.findAll();
    return res.status(HttpCode.OK).send(articles);
  });
  // DONE
  router.post(`/`, validateArticle, (req, res) => {
    console.log(`router`);
    const article = articleService.create(req.body);
    return res.status(HttpCode.CREATED).send(article);
  });
};
