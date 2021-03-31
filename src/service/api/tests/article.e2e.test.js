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

const newComment = {
  "text": `Мне кажется или я уже читал это где-то? Плюсую но слишком много буквы!`
};
const testArticleId = `WUTQ4W`;
const testCommentId = `Cc47cI`;

describe(`API returns articles - GET`, () => {
  let response;
  let app;

  beforeAll(async () => {
    app = createAPI();
    response = await request(app).get(`/articles`);
  });

  afterAll(() => {
    app = null;
  });

  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`Returns correct amount of articles`, () => {
    expect(response.body.length).toBe(mockArticles.length);
  });
});

describe(`API returns article - GET`, () => {
  describe(`Success`, () => {
    let response;
    let app;

    const expectedArticle = mockArticles.find((it) => it.id === testArticleId);

    beforeAll(async () => {
      app = createAPI();

      response = await request(app).get(`/articles/${testArticleId}`);
    });

    afterAll(() => {
      app = null;
    });

    test(`Status code 200`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test(`Returns correct article`, () => {
      expect(response.body.id).toBe(testArticleId);
      expect(response.body.title).toBe(expectedArticle.title);
    });
  });

  describe(`Not success`, () => {
    const wrongArticleId = `wrongId`;
    const app = createAPI();

    test(`Status code 404 and not found message`, async () => {
      const response = await request(app).get(`/articles/${wrongArticleId}`);

      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
      expect(response.text).toBe(ServerMessage.NOT_FOUND_MESSAGE);
    });
  });
});

describe(`API update article - PUT`, () => {
  let response;
  const app = createAPI();

  describe(`Success`, () => {
    beforeAll(async () => {
      response = await request(app)
        .put(`/articles/${testArticleId}`)
        .send(newArticle);
    });

    test(`Status code 200`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test(`Returns changed article`, () => {
      expect(response.body).toEqual(expect.objectContaining(newArticle));
    });

    test(`Article is really changed`, async () => {
      response = await request(app)
        .get(`/articles/${testArticleId}`);

      expect(response.body.title).toBe(newArticle.title);
    });
  });

  describe(`Not success`, () => {
    const invalidArticleId = `WUTQ4W`;

    const notValidArticle = {
      wrongArticleKey: `Some text`
    };

    test(`API returns status code 400 when trying to change an article with invalid data`, async () => {
      response = await request(app)
        .put(`/articles/${invalidArticleId}`)
        .send(notValidArticle);

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test(`API returns status code 404 when trying to change non-existent article`, () => {
      return request(app)
        .put(`/articles/NOEXIST`)
        .send(newArticle)
        .expect(HttpCode.NOT_FOUND);
    });
  });
});

describe(`API create an article - POST`, () => {
  let response;
  const app = createAPI();

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });

  describe(`API creates an article if data is valid`, () => {
    test(`Status code 201`, () => {
      expect(response.statusCode).toBe(HttpCode.CREATED);
    });

    test(`Returns article created`, () => {
      expect(response.body).toEqual(expect.objectContaining(newArticle));
    });

    test(`Articles count is changed`, async () => {
      response = await request(app).get(`/articles`);
      const newArticleAmount = 6;

      expect(response.body.length).toBe(newArticleAmount);
    });
  });

  describe(`Not success`, () => {
    test(`Without any required property response code is 400`, async () => {
      for (const key of Object.keys(newArticle)) {
        const badArticle = {...newArticle};
        delete badArticle[key];
        await request(app).post(`/articles`).send(badArticle).expect(HttpCode.BAD_REQUEST);
      }
    });
  });
});

describe(`API delete article - DELETE`, () => {
  let response;
  let app;

  beforeAll(async () => {
    app = createAPI();
    response = await request(app)
      .delete(`/articles/${testArticleId}`);
  });

  afterAll(() => {
    app = null;
  });

  describe(`Success`, () => {
    test(`Status code 200`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test(`Returns deleted article`, () => {
      expect(response.body.id).toBe(`WUTQ4W`);
    });

    test(`Article count is correct reduced by 1 after deleting`, async () => {
      response = await request(app).get(`/articles`);
      expect(response.body.length).toBe(mockArticles.length - 1);
    });
  });

  describe(`Not success`, () => {
    test(`API returns status code 404 when trying to delete non-existent article`, async () => {
      response = await request(app)
        .delete(`/articles/NOEXIST`)
        .send(newArticle);

      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });
});

describe(`API returns comments - GET`, () => {
  let response;
  let app = createAPI();

  beforeAll(async () => {
    response = await request(app).get(`/articles/${testArticleId}/comments`);
  });

  afterAll(() => {
    app = null;
  });

  describe(`Success`, () => {
    test(`Status code 200`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test(`Returns correct comments amount`, () => {
      const expectedCommentsAmount = 1;
      expect(response.body.length).toBe(expectedCommentsAmount);
    });
  });

  describe(`Not success`, () => {
    test(`API refuses to get comments from non-existent article`, async () => {
      response = await request(app).get(`/articles/NOEXIST/comments`);
      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });
});

describe(`API create comments - POST`, () => {
  let response;
  let app = createAPI();

  beforeAll(async () => {
    response = await request(app).post(`/articles/${testArticleId}/comments`).send(newComment);
  });

  afterAll(() => {
    app = null;
  });

  describe(`Success`, () => {
    test(`Status code 200`, () => {
      expect(response.statusCode).toBe(HttpCode.CREATED);
    });

    test(`Returns correct comment id`, () => {
      expect(response.body.text).toBe(newComment.text);
    });

    test(`Comments count is changed`, async () => {
      response = await request(app).get(`/articles/${testArticleId}/comments`);
      const newCommentsAmount = 2;

      expect(response.body.length).toBe(newCommentsAmount);
    });
  });

  describe(`Not success`, () => {
    test(`API refuses to post comments to non-existent article`, async () => {
      response = await request(app).post(`/articles/NOEXIST/comments`).send(newComment);
      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    test(`Without any required property response code is 400`, async () => {
      const badComment = {'wrongPropertyName': `some text`};
      response = await request(app).post(`/articles/NOEXIST/comments`).send(badComment);
      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });
});

describe(`API delete article comment - DELETE`, () => {
  let response;
  let app;

  beforeAll(async () => {
    app = createAPI();
    response = await request(app)
      .delete(`/articles/${testArticleId}/comments/${testCommentId}`);
  });

  afterAll(() => {
    app = null;
  });

  describe(`Success`, () => {
    test(`Status code 200`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test(`Returns deleted comment`, () => {
      expect(response.body.id).toBe(testCommentId);
    });

    test(`Article count is correct reduced by 1 after deleting`, async () => {
      const testCommentamountAfterDeleting = 0;
      response = await request(app).get(`/articles/${testArticleId}/comments`);
      expect(response.body.length).toBe(testCommentamountAfterDeleting);
    });
  });

  describe(`Not success`, () => {
    test(`API returns status code 404 when trying to delete non-existent article`, async () => {
      response = await request(app)
        .delete(`/articles/NOEXIST/comments/${testCommentId}`)
        .send(newArticle);

      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });
});

describe(`API returns comment - GET`, () => {
  describe(`Success`, () => {
    let response;
    let app;

    beforeAll(async () => {
      app = createAPI();
      response = await request(app).get(`/articles/${testArticleId}/comments/${testCommentId}`);
    });

    afterAll(() => {
      app = null;
    });

    test(`Status code 200`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test(`Returns correct article comment`, () => {
      expect(response.body.id).toBe(testCommentId);
    });
  });

  describe(`Not success`, () => {
    const wrongArticleId = `wrongId`;
    const wrongCommentId = `wrongId`;
    const app = createAPI();

    test(`Status code 404 and not found message if article id is wrong`, async () => {
      const response = await request(app).get(`/articles/${wrongArticleId}`);

      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
      expect(response.text).toBe(ServerMessage.NOT_FOUND_MESSAGE);
    });

    test(`Status code 404 and not found message if comment id is wrong`, async () => {
      const response = await request(app).get(`/articles/${testArticleId}/comments/${wrongCommentId}`);

      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
      expect(response.text).toBe(ServerMessage.NOT_FOUND_MESSAGE);
    });
  });
});
