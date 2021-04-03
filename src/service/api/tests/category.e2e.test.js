const express = require(`express`);
const request = require(`supertest`);
const {HttpCode} = require(`../../constants`);
const {CategoryService} = require(`../../data-service`);
const category = require(`../category`);
const {mockArticles} = require(`./mocks`);

const mockCategories = [
  `Музыка`,
  `Разное`,
  `Деревья`,
  `IT`,
  `Программирование`,
  `Без рамки`,
  `Железо`,
  `Кино`,
  `За жизнь`,
];

const app = express();
app.use(express.json());
category(app, new CategoryService(mockArticles));

describe(`API returns category list`, () => {
  let response;

  beforeEach(async () => {
    response = await request(app).get(`/categories`);
  });

  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`Returns list of 9 categories`, () => {
    expect(response.body.length).toBe(9);
  });

  test(`Category names are correct`, () => {
    expect(response.body).toEqual(
        expect.arrayContaining(mockCategories)
    );
  });
});
