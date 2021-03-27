const {HttpCode, ServerMessage} = require(`../constants`);
const {COMMENT_KEYS} = require(`./constants`);

const validateComment = (req, res, next) => {
  const keys = Object.keys(req.body);

  const keysExists = COMMENT_KEYS.every((key) => keys.includes(key));
  const isValid = keysExists && COMMENT_KEYS.length === keys.length;

  if (!isValid) {
    return res.status(HttpCode.BAD_REQUEST).send(ServerMessage.BAD_REQUEST);
  }

  return next();
};

module.exports = {validateComment};
