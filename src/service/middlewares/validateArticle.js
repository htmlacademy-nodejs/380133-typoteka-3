const {HttpCode, ServerMessage} = require(`../constants`);
const {RequestMethods} = require(`../constants`);
const {ARTICLE_KEYS} = require(`./constants`);

const validateArticle = (req, res, next) => {
  const {method} = req;
  const keys = Object.keys(req.body);

  let isValid;

  if (method === RequestMethods.PUT) {
    isValid = keys.every((key) => ARTICLE_KEYS.includes(key));
  }

  if (method === RequestMethods.POST) {
    const keysExists = ARTICLE_KEYS.every((key) => keys.includes(key));

    isValid = keysExists && ARTICLE_KEYS.length === keys.length;
  }

  if (!isValid) {
    return res.status(HttpCode.BAD_REQUEST).send(ServerMessage.BAD_REQUEST);
  }

  return next();
};

module.exports = {validateArticle};
