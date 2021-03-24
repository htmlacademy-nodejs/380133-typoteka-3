const {Router} = require(`express`);
const articleRoutes = require(`./articles`);
const {ArticleService} = require(`../data-service`);
const {getMockData} = require(`../lib/get-mock-data`);

const router = new Router();

(async () => {
  const mockData = await getMockData();

  articleRoutes(router, new ArticleService(mockData));
})();

module.exports = {router};

