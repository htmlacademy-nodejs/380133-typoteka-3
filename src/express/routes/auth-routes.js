const {Router} = require(`express`);

const authRouter = new Router();

authRouter.get(`/`, (req, res) => res.render(`./pages/login`));

module.exports = authRouter;
