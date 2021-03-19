const {Router} = require(`express`);

const authRouter = new Router();

authRouter.get(`/`, (req, res) => res.send(`/login`));

module.exports = authRouter;
