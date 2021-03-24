const {HttpCode, ServerMessage} = require(`../constants`);

const checkIsArticleExists = (service) => (req, res, next) => {
  const article = service.findOne(req.params.articleId);

  if (!article) {
    return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
  }

  res.locals.article = article;
  return next();
};

module.exports = {checkIsArticleExists};
