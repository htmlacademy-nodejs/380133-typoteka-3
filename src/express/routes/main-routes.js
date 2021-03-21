const {Router} = require(`express`);

const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => res.render(`./pages/main`));

module.exports = mainRouter;
