const {Router} = require(`express`);
const articleRoutes = require(`./articles`);
const categoryRoutes = require(`./categories`);
const {ArticleService, CategoriesService} = require(`../data-service`);
const {getMockData} = require(`../lib/get-mock-data`);

const router = new Router();

(async () => {
  const mockData = await getMockData();

  articleRoutes(router, new ArticleService(mockData));
  categoryRoutes(router, new CategoriesService(mockData));
})();

module.exports = {router};

