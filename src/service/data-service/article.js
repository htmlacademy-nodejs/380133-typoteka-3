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
    const article = this._articles.find((it) => it.id === id);

    if (!article) {
      return null;
    }

    return article;
  }

  create(article) {
    const newArticle = {
      id: nanoid(MAX_ID_LENGTH),
      comments: [],
      ...article
    };

    this._articles.push(newArticle);
    return newArticle;
  }

  update(id, article) {
    const oldArticle = this.findOne(id);

    if (!oldArticle) {
      return null;
    }

    return Object.assign(oldArticle, article);
  }

  delete(id) {
    const deletedArticle = this.findOne(id);

    if (!deletedArticle) {
      return null;
    }

    this._articles = this._articles.filter((it) => it.id !== id);
    return deletedArticle;
  }
}

module.exports = {ArticleService};
