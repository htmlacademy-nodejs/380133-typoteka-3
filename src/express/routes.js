const categoriesRouter = require(`./routes/categories`);
const searchRouter = require(`./routes/search`);
const articlesRouter = require(`./routes/articles`);
const myRouter = require(`./routes/my-routes`);
const authRouter = require(`./routes/auth-routes`);
const userRouter = require(`./routes/user-routes`);
const mainRouter = require(`./routes/main-routes`);

const routes = (app) => {
  app.use(`/categories`, categoriesRouter);
  app.use(`/search`, searchRouter);
  app.use(`/articles`, articlesRouter);
  app.use(`/my`, myRouter);
  app.use(`/register`, userRouter);
  app.use(`/login`, authRouter);
  app.use(`/`, mainRouter);
};

module.exports = routes;
