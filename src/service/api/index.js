const {Router} = require(`express`);
const articleRoutes = require(`./article`);
const categoryRoutes = require(`./category`);
const {ArticleService, CategoryService, CommentService} = require(`../data-service`);
const {getMockData} = require(`../lib/get-mock-data`);

const router = new Router();

(async () => {
  const mockData = await getMockData();

  articleRoutes(router, new ArticleService(mockData), new CommentService());
  categoryRoutes(router, new CategoryService(mockData));
})();

module.exports = {router};

