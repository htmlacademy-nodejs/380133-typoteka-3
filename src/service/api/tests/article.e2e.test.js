const express = require(`express`);
const request = require(`supertest`);
const {HttpCode, ServerMessage} = require(`../../constants`);
const {ArticleService, CommentService} = require(`../../data-service`);
const article = require(`../article`);
// const {mockArticles} = require(`./mocks`);

jest.mock(`./mocks`, ()=> () => ([
  {
    "id": `WUTQ4W`,
    "title": `Ёлки. История деревьев`,
    "announce": `Лишь сторонники в науке будут рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Простые ежедневные упражнения помогут достичь успеха. Не следует, однако, забывать, что укрепление и развитие внутренней структуры играет определяющее значение! Из под его пера вышло 8 платиновых альбомов.`,
    "fullText": `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Идейные соображения высшего порядка, а также высококачественный прототип будущего проекта способствует подготовке. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Золотое сечение — соотношение двух величин, гармоническая пропорция. Собрать камни бесконечности легко, если вы прирожденный герой. Лишь сторонники в науке будут рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Не следует, однако, забывать, что укрепление и развитие внутренней структуры играет определяющее значение! Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Это один из лучших рок-музыкантов. Следует отметить, что высокотехнологичная концепция общественного уклада говорит о возможностях распределения внутренних резервов и ресурсов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. Лишь сторонники в науке будут рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Это один из лучших рок-музыкантов. Следует отметить, что высокотехнологичная концепция общественного уклада говорит о возможностях распределения внутренних резервов и ресурсов. Программировать не настолько сложно, как об этом говорят. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Прежде всего, курс на социально-ориентированный проект обеспечивает актуальность экономической целесообразности решений. Превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. Идейные соображения высшего порядка, а также высококачественный прототип будущего проекта способствует подготовке. Программировать не настолько сложно, как об этом говорят. Достичь успеха помогут ежедневные повторения.`,
    "category": [
      `Музыка`,
      `Разное`,
      `Деревья`,
      `IT`,
      `Программирование`
    ],
    "createdDate": `2021-01-20T19:47:16.953Z`,
    "comments": [
      {
        "id": `Cc47cI`,
        "text": `Хочу такую же футболку :-) Плюсую но слишком много буквы!`
      }
    ]
  },
  {
    "id": `zHMp6o`,
    "title": `Обзор новейшего смартфона`,
    "announce": `Простые ежедневные упражнения помогут достичь успеха. Первая большая ёлка была установлена только в 1938 году. Достичь успеха помогут ежедневные повторения. Программировать не настолько сложно, как об этом говорят. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    "fullText": `Простые ежедневные упражнения помогут достичь успеха. Из под его пера вышло 8 платиновых альбомов. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Как начать действовать? Для начала просто соберитесь. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Следует отметить, что высокотехнологичная концепция общественного уклада говорит о возможностях распределения внутренних резервов и ресурсов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Программировать не настолько сложно, как об этом говорят. Лишь сторонники в науке будут рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Прежде всего, курс на социально-ориентированный проект обеспечивает актуальность экономической целесообразности решений. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Простые ежедневные упражнения помогут достичь успеха. Простые ежедневные упражнения помогут достичь успеха. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Не следует, однако, забывать, что укрепление и развитие внутренней структуры играет определяющее значение! Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Не следует, однако, забывать, что укрепление и развитие внутренней структуры играет определяющее значение! Превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. Следует отметить, что высокотехнологичная концепция общественного уклада говорит о возможностях распределения внутренних резервов и ресурсов. Как начать действовать? Для начала просто соберитесь. Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
    "category": [
      `Разное`,
      `IT`,
      `Без рамки`,
      `Железо`,
      `Кино`,
      `За жизнь`
    ],
    "createdDate": `2021-01-26T23:48:05.216Z`,
    "comments": [
      {
        "id": `8L2eY-`,
        "text": `Совсем немного... Мне не нравится ваш стиль. Ощущение что вы меня поучаете.`
      },
      {
        "id": `NmuRBn`,
        "text": `Мне кажется или я уже читал это где-то? Плюсую но слишком много буквы!`
      },
      {
        "id": `h-Pzmf`,
        "text": `Планируете записать видосик на эту тему? Согласен с автором!`
      }
    ]
  },
  {
    "id": `TZuL-g`,
    "title": `Учим HTML и CSS`,
    "announce": `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Это один из лучших рок-музыкантов. Превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. Не следует, однако, забывать, что укрепление и развитие внутренней структуры играет определяющее значение! Простые ежедневные упражнения помогут достичь успеха.`,
    "fullText": `Ёлки — это не просто красивое дерево. Это прочная древесина. Программировать не настолько сложно, как об этом говорят. Собрать камни бесконечности легко, если вы прирожденный герой. Не следует, однако, забывать, что укрепление и развитие внутренней структуры играет определяющее значение! Как начать действовать? Для начала просто соберитесь. Достичь успеха помогут ежедневные повторения. Превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. Программировать не настолько сложно, как об этом говорят. Он написал больше 30 хитов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Это один из лучших рок-музыкантов. Программировать не настолько сложно, как об этом говорят. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. Ёлки — это не просто красивое дерево. Это прочная древесина. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Золотое сечение — соотношение двух величин, гармоническая пропорция. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    "category": [
      `Без рамки`,
      `Разное`,
      `Кино`,
      `IT`
    ],
    "createdDate": `2021-01-23T00:18:46.317Z`,
    "comments": [
      {
        "id": `GvFejt`,
        "text": `Мне не нравится ваш стиль. Ощущение что вы меня поучаете. Хочу такую же футболку :-)`
      },
      {
        "id": `DbTKT7`,
        "text": `Хочу такую же футболку :-)`
      }
    ]
  },
  {
    "id": `CzmFqT`,
    "title": `Учим HTML и CSS`,
    "announce": `Ёлки — это не просто красивое дерево. Это прочная древесина. Простые ежедневные упражнения помогут достичь успеха. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Как начать действовать? Для начала просто соберитесь.`,
    "fullText": `Достичь успеха помогут ежедневные повторения. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Простые ежедневные упражнения помогут достичь успеха. Он написал больше 30 хитов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. Золотое сечение — соотношение двух величин, гармоническая пропорция. Первая большая ёлка была установлена только в 1938 году. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Идейные соображения высшего порядка, а также высококачественный прототип будущего проекта способствует подготовке. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Идейные соображения высшего порядка, а также высококачественный прототип будущего проекта способствует подготовке. Программировать не настолько сложно, как об этом говорят. Он написал больше 30 хитов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
    "category": [
      `Кино`,
      `За жизнь`,
      `Программирование`,
      `Железо`,
      `IT`,
      `Музыка`
    ],
    "createdDate": `2021-02-03T03:21:49.894Z`,
    "comments": [
      {
        "id": `8gwVo2`,
        "text": `Это где ж такие красоты? Согласен с автором! Мне не нравится ваш стиль. Ощущение что вы меня поучаете.`
      },
      {
        "id": `BOt9MD`,
        "text": `Мне не нравится ваш стиль. Ощущение что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Согласен с автором!`
      },
      {
        "id": `q4saUo`,
        "text": `Согласен с автором!`
      }
    ]
  },
  {
    "id": `iLfomE`,
    "title": `Как достигнуть успеха не вставая с кресла`,
    "announce": `Достичь успеха помогут ежедневные повторения. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Собрать камни бесконечности легко, если вы прирожденный герой. Кстати, сторонники в науке, превозмогая сложившуюся непростую экономическую ситуацию. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    "fullText": ``,
    "category": [
      `Деревья`,
      `За жизнь`,
      `Без рамки`,
      `Разное`,
      `IT`,
      `Музыка`,
      `Кино`,
      `Программирование`,
      `Железо`,
    ],
    "createdDate": `2021-02-14T03:01:06.767Z`,
    "comments": [
      {
        "id": `BZc-LS`,
        "text": `Мне не нравится ваш стиль. Ощущение что вы меня поучаете.`
      },
      {
        "id": `zxYYnu`,
        "text": `Мне кажется или я уже читал это где-то?`
      }
    ]
  }
]));
const getMockArticles = require(`./mocks`);

const createAPI = () => {
  const app = express();
  const articles = getMockArticles();

  const cloneData = JSON.parse(JSON.stringify(articles));

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
    expect(response.body.length).toBe(getMockArticles().length);
  });
});

describe(`API returns article - GET`, () => {
  describe(`Success`, () => {
    let response;
    let app;

    const testArticleTitle = getMockArticles()[0].title;

    beforeEach(async () => {
      app = createAPI();

      response = await request(app).get(`/articles/${testArticleId}`);
    });

    afterEach(() => {
      app = null;
    });

    test(`Status code 200`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test(`Returns correct article`, () => {
      expect(response.body.id).toBe(testArticleId);
      expect(response.body.title).toBe(testArticleTitle);
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

    test(`Offer is really changed`, async () => {
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

    test(`API returns status code 400 when trying to change an offer with invalid data`, async () => {
      const app = createAPI();
      response = await request(app)
        .put(`/articles/${invalidArticleId}`)
        .send(notValidArticle);

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test(`API returns status code 404 when trying to change non-existent offer`, () => {
      const app = createAPI();
      return request(app)
        .put(`/articles/NOEXIST`)
        .send(newArticle)
        .expect(HttpCode.NOT_FOUND);
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
    jest.resetAllMocks();
  });

  describe(`Success`, () => {

    test(`Status code 200`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test(`Returns deleted offer`, () => {
      expect(response.body.id).toBe(`WUTQ4W`);
    });

    test(`Offer count is correct reduced by 1 after deleting`, async () => {
      const articles = getMockArticles();
      response = await request(app).get(`/articles`);
      expect(response.body.length).toBe(articles.length - 1);
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

  beforeAll(async () => {
    jest.resetAllMocks();
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
  });

  // describe(`Not success`, () => {

  // });
});
