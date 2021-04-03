const express = require(`express`);
const request = require(`supertest`);
const {HttpCode} = require(`../../constants`);
const {SearchService} = require(`../../data-service`);
const search = require(`../search`);
const {mockArticles} = require(`./mocks`);

const app = express();
app.use(express.json());
search(app, new SearchService(mockArticles));

describe(`API returns article based on search query`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/search`).query({query: `История деревьев`});
  });

  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`1 article found`, () => {
    expect(response.body.length).toBe(1);
  });

  test(`Article has correct id`, () => {
    expect(response.body[0].id).toBe(`WUTQ4W`);
  });
});

describe(`Check unsuccessful cases`, () => {
  test(`If no any matches returns empty array`, async () => {
    const response = await request(app).get(`/search`).query({query: `some not exicting query`});

    expect(response.body.length).toBe(0);
  });

  test(`If no any search query was send`, async () => {
    const response = await request(app).get(`/search`);

    expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
});


