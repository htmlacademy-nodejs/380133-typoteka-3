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
    const article = this._articles.find((it) => {
      const result = it.id === id;
      return result;
    });

    if (!article) {
      return null;
    }

    return article;
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
    const newArticles = this._articles.filter((it) => it.id !== id);
    this._articles = [...newArticles];
    return deletedArticle;
  }
}

module.exports = {ArticleService};
