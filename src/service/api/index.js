const {Router} = require(`express`);
const articleRoutes = require(`./article`);
const categoryRoutes = require(`./category`);
const searchRoutes = require(`./search`);
const {ArticleService, CategoryService, CommentService, SearchService} = require(`../data-service`);
const {getMockData} = require(`../lib/get-mock-data`);

const router = new Router();

(async () => {
  const mockData = await getMockData();

  const categoryService = new CategoryService(mockData);
  const articleService = new ArticleService(mockData);
  const commentService = new CommentService(articleService);
  const searchService = new SearchService(mockData);

  categoryRoutes(router, categoryService);
  articleRoutes(router, articleService, commentService);
  searchRoutes(router, searchService);
})();

module.exports = {router};

