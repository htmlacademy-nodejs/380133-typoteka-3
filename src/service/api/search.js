const {Router} = require(`express`);
const {HttpCode, ServerMessage} = require(`../constants`);

module.exports = (app, service) => {
  const router = new Router();

  app.use(`/search`, router);

  router.get(`/`, (req, res) => {
    const {query} = req.query;

    if (!query) {
      return res.status(HttpCode.BAD_REQUEST).send(ServerMessage.BAD_REQUEST);
    }

    const result = service.find(query);

    return res.status(HttpCode.OK).send(result);
  });
};
