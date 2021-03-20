const {Router} = require(`express`);

const userRouter = new Router();

userRouter.get(`/`, (req, res) => res.render(`sign-up`));

module.exports = userRouter;
