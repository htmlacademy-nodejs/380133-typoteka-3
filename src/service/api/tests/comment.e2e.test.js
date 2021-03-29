const express = require(`express`);
const request = require(`supertest`);
const {HttpCode, ServerMessage} = require(`../../constants`);
const {ArticleService, CommentService} = require(`../../data-service`);
const article = require(`../article`);
const {mockArticles} = require(`./mocks`);

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockArticles));

  app.use(express.json());

  const articleService = new ArticleService(cloneData);
  const commentService = new CommentService(articleService);

  article(app, articleService, commentService);

  return app;
};

const newArticle = {
  "title": `Как собрать камни бесконечности`,
  "announce": `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  "fullText": `Первая большая ёлка была установлена только в 1938 году. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Как начать действовать? Для начала просто соберитесь. Ёлки — это не просто красивое дерево. Это прочная древесина. Он написал больше 30 хитов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  "category": [
    `Музыка`
  ]
};
const testArticleId = `WUTQ4W`;

describe(`API returns comments - GET`, () => {
  let response;
  let app;

  beforeAll(async () => {
    app = createAPI();
    response = await request(app).get(`/articles/${testArticleId}/comments`);
  });

  afterAll(() => {
    app = null;
  });

  describe(`Success`, () => {

    test(`Status code 200`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test(`Returns correct amount of comments`, () => {
      const expectedCommentsAmount = 1;
      expect(response.body.length).toBe(expectedCommentsAmount);
    });
  });

  describe(`Not success`, () => {

  });

});
