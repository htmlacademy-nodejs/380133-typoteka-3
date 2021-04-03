const {Router} = require(`express`);
const {HttpCode, ServerMessage} = require(`../constants`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger({name: `api/categories`});

module.exports = (app, service) => {
  const router = new Router();

  app.use(`/categories`, router);

  router.get(`/`, (req, res) => {
    const categories = service.findAll();

    if (!categories) {
      logger.error(`${ServerMessage.NOT_FOUND_MESSAGE}: ${req.url}`);
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(categories);
  });
};
