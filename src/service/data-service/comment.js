const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../constants`);

class CommentService {
  constructor(articleService) {
    this._articleService = articleService;
  }

  findOne(id, article) {
    const comment = article.comments.find((it) => it.id === id);

    if (!comment) {
      return null;
    }

    return comment;
  }

  findAll(article) {
    return article.comments;
  }

  create(commentText, article) {
    const {id: articleId, comments} = article;

    const newComment = {
      id: nanoid(MAX_ID_LENGTH),
      text: commentText,
    };

    comments.push(newComment);
    const updatedArticle = this._articleService.update(articleId,
        {...article, comments});

    if (!updatedArticle) {
      return null;
    }

    return newComment;
  }

  delete(id, article) {
    const {id: articleId, comments} = article;

    const deletedComment = this.findOne(id, article);

    if (!deletedComment) {
      return null;
    }

    const updatedComments = comments.filter((it) => it.id !== id);
    this._articleService.update(articleId, {comments: updatedComments});

    return deletedComment;
  }
}

module.exports = {CommentService};
