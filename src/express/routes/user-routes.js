const {Router} = require(`express`);

const userRouter = new Router();

userRouter.get(`/`, (req, res) => res.send(`/register`));

module.exports = userRouter;
