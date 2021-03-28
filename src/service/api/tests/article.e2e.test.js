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
  console.log(`createAPI cloneData:`, cloneData.map((it) => it.id));

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

// describe(`API returns articles - GET`, () => {
//   let response;
//   let app;

//   beforeAll(async () => {
//     app = createAPI();
//     response = await request(app).get(`/articles`);
//   });

//   afterAll(() => {
//     app = null;
//   });

//   test(`Status code 200`, () => {
//     expect(response.statusCode).toBe(HttpCode.OK);
//   });

//   test(`Returns correct amount of articles`, () => {
//     expect(response.body.length).toBe(mockArticles.length);
//   });
// });

// describe(`API returns article - GET`, () => {
//   describe(`Success`, () => {
//     let response;
//     let app;

//     const testArticleId = mockArticles[0].id;
//     const testArticleTitle = mockArticles[0].title;

//     beforeEach(async () => {
//       app = createAPI();

//       response = await request(app).get(`/articles/${testArticleId}`);
//     });

//     afterEach(() => {
//       app = null;
//     });

//     test(`Status code 200`, () => {
//       expect(response.statusCode).toBe(HttpCode.OK);
//     });

//     test(`Returns correct article`, () => {
//       expect(response.body.id).toBe(testArticleId);
//       expect(response.body.title).toBe(testArticleTitle);
//     });
//   });

//   describe(`Not success`, () => {
//     const wrongArticleId = `wrongId`;
//     const app = createAPI();

//     test(`Status code 404 and not found message`, async () => {
//       const response = await request(app).get(`/articles/${wrongArticleId}`);

//       expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
//       expect(response.text).toBe(ServerMessage.NOT_FOUND_MESSAGE);
//     });
//   });
// });

// describe(`API update article - PUT`, () => {
//   let response;

//   describe(`Success`, () => {
//     beforeAll(async () => {
//       const app = createAPI();

//       response = await request(app)
//         .put(`/articles/${testArticleId}`)
//         .send(newArticle);
//     });

//     test(`Status code 200`, () => {
//       expect(response.statusCode).toBe(HttpCode.OK);
//     });

//     test(`Returns changed article`, () => {
//       expect(response.body).toEqual(expect.objectContaining(newArticle));
//     });

//     test(`Offer is really changed`, async () => {
//       const app = createAPI();
//       response = await request(app)
//         .get(`/articles/${testArticleId}`);

//       expect(response.body.title).toBe(newArticle.title);
//     });
//   });

//   describe(`Not success`, () => {
//     const invalidArticleId = `WUTQ4W`;

//     const notValidArticle = {
//       wrongArticleKey: `Some text`
//     };

//     test(`API returns status code 400 when trying to change an offer with invalid data`, async () => {
//       const app = createAPI();
//       response = await request(app)
//         .put(`/articles/${invalidArticleId}`)
//         .send(notValidArticle);

//       expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
//     });

//     test(`API returns status code 404 when trying to change non-existent offer`, () => {
//       const app = createAPI();
//       return request(app)
//         .put(`/articles/NOEXIST`)
//         .send(newArticle)
//         .expect(HttpCode.NOT_FOUND);
//     });
//   });
// });

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

    test(`Returns deleted offer`, () => {
      expect(response.body.id).toBe(`WUTQ4W`);
    });

    test(`Offer count is 4 now`, async () => {
      response = await request(app).get(`/articles`);
      expect(response.body.length).toBe(4);
    });
  });

  describe(`Not success`, () => {
    test(`API returns status code 404 when trying to delete non-existent offer`, async () => {
      response = await request(app)
        .delete(`/articles/NOEXIST`)
        .send(newArticle);

      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });
});

describe.only(`API returns comments - GET`, () => {
  let response;
  let app;

  beforeAll(() => {
    app = createAPI();
  });

  afterAll(() => {
    app = null;
  });

  test(`Status code 200`, async () => {
    response = await request(app).get(`/articles/${testArticleId}/comments`);

    expect(response.statusCode).toBe(HttpCode.OK);
  });

  // describe(`Success`, () => {
  //   test(`Status code 200`, async () => {
  //     response = await request(app).get(`/articles/${testArticleId}/comments`);

  //     expect(response.statusCode).toBe(HttpCode.OK);
  //   });

  //   // test(`Returns correct amount of articles`, () => {
  //   //   expect(response.body.length).toBe(mockArticles.length);
  //   // });
  // });
});
