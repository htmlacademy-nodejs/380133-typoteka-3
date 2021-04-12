const axios = require(`axios`);
const chalk = require(`chalk`);
const {
  ServerMessage,
  TIMEOUT,
  DEFAULT_API_PORT,
} = require(`./constants`);

const port = process.env.API_PORT || DEFAULT_API_PORT;
const defaultUrl = `http://localhost:${port}/api/`;

class API {
  constructor(baseURL, timeout) {
    this._http = axios.create({baseURL, timeout});
  }

  async _load(url, options) {
    let data;
    try {
      const response = await this._http.request(
          {
            url: `${url}`,
            ...options
          });

      data = response.data;
    } catch (error) {
      console.info(chalk.red(ServerMessage._load_ERROR, error));
    }

    return data;
  }

  getArticles() {
    return this._load(`/articles`);
  }

  getArticle(id) {
    return this._load(`/articles/${id}`);
  }

  search(query) {
    return this._load(`/search`, {params: {query}});
  }

  getCategories() {
    return this._load(`/categories`);
  }

  createArticle(data) {
    return this._load(`/articles`, {
      method: `POST`,
      data
    });
  }
}

const defaultAPI = new API(defaultUrl, TIMEOUT);

module.exports = {
  API,
  getAPI: () => defaultAPI
};
