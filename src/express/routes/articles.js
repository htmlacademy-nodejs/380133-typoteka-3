const {Router} = require(`express`);

const articlesRouter = new Router();

articlesRouter.get(`/:id`, (req, res) => res.send(`/articles/:id`));
articlesRouter.get(`/category/:id`, (req, res) => res.render(`./components/articles-by-category`));
articlesRouter.get(`/add`, (req, res) => res.send(`/articles/add`));
articlesRouter.get(`/edit/:id`, (req, res) => res.send(`/articles/edit/:id`));

module.exports = articlesRouter;
