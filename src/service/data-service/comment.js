const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../constants`);

class CommentService {
  constructor(articleService) {
    this._articleService = articleService;
  }

  findAll(article) {
    return article.comments;
  }

  create(commentText, article) {
    const newComment = {
      id: nanoid(MAX_ID_LENGTH),
      text: commentText,
    };

    article.comments.push(newComment);
    return newComment;
  }

  drop(id, article) {
    const deletedComment = this.findOne(id, article);

    if (!deletedComment) {
      return null;
    }

    article.comments = article.comments.filter((it) => it.id !== id);

    this._articleService.update(article.id, {comments: article.comments});

    return deletedComment;
  }

  findOne(id, article) {
    return article.comments.find((comment) => comment.id === id);
  }
}

module.exports = {CommentService};
