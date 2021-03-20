const {Router} = require(`express`);

const authRouter = new Router();

authRouter.get(`/`, (req, res) => res.render(`login`));

module.exports = authRouter;
