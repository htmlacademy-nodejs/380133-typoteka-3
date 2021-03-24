const {Router} = require(`express`);
const articleRoutes = require(`./article`);
const categoryRoutes = require(`./category`);
const searchRoutes = require(`./search`);
const {ArticleService, CategoryService, CommentService, SearchService} = require(`../data-service`);
const {getMockData} = require(`../lib/get-mock-data`);

const router = new Router();

(async () => {
  const mockData = await getMockData();

  categoryRoutes(router, new CategoryService(mockData));
  articleRoutes(router, new ArticleService(mockData), new CommentService());
  searchRoutes(router, new SearchService(mockData));
})();

module.exports = {router};

