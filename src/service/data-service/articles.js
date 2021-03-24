const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../constants`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((article) => article.id === id);
  }

  create(article) {
    const newArticle = {
      id: nanoid(MAX_ID_LENGTH),
      comments: [],
      createdDate: Date.now(),
      ...article
    };

    this._articles.push(newArticle);
    return newArticle;
  }

  update(id, article) {
    const oldArticle = this._articles
    .find((item) => item.id === id);

    return Object.assign(oldArticle, article);
  }

  drop(id) {
    const deletedArticle = this.findOne(id);

    if (!deletedArticle) {
      return null;
    }

    this._articles = this._articles.filter((it) => it.id !== id);
    return deletedArticle;
  }
}

module.exports = {ArticleService};
