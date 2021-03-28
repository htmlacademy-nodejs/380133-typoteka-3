const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../constants`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
    console.log(`constructor MAP this._articles:`, articles.map((it) => it.id));
  }

  findAll() {
    console.log(`findAll this._articles:`, this._articles.map((it) => it.id));
    return this._articles;
  }

  findOne(id) {

    const article = this._articles.find((it) => {
      const result = it.id === id;
      // console.log(`it.id:`, it.id);
      // console.log(`id:`, id);
      // console.log(`result:`, result);
      return result;
    });

    // console.log(`this._articles.length`, this._articles.length);
    // console.log(`findOne id:`, id);
    // console.log(`findOne article:`, article);
    console.log(`findOne this._articles:`, this._articles.map((it) => it.id));
    if (!article) {
      return null;
    }
    // console.log(`findOne article:`, article.id);

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
    console.log(`delete id:`, id);
    const deletedArticle = this.findOne(id);

    if (!deletedArticle) {
      return null;
    }

    this._articles = this._articles.filter((it) => it.id !== id);
    return deletedArticle;
  }
}

module.exports = {ArticleService};
