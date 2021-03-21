const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/comments`, (req, res) => res.render(`./components/comments`));
myRouter.get(`/`, (req, res) => res.render(`./pages/my`));

module.exports = myRouter;
