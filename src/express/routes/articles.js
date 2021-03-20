const {Router} = require(`express`);

const articlesRouter = new Router();

articlesRouter.get(`/add`, (req, res) => res.render(`./components/new-post`));
articlesRouter.get(`/category/:id`, (req, res) => res.render(`./components/articles-by-category`));
articlesRouter.get(`/edit/:id`, (req, res) => res.send(`/articles/edit/:id`));
articlesRouter.get(`/:id`, (req, res) => res.send(`/articles/:id`));

module.exports = articlesRouter;
