const {Router} = require(`express`);
const {HttpCode, ServerMessage} = require(`../constants`);

const router = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, router);

  router.get(`/`, (req, res) => {
    const categories = service.findAll();

    if (!categories) {
      return res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);
    }

    return res.status(HttpCode.OK).send(categories);
  });
};
