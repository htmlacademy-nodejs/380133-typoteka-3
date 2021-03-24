class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  find(searchQuery) {
    const query = searchQuery.trim().toLowerCase();

    const result = this._articles.filter((article) => article.title.toLowerCase().includes(query));

    return result.length ? result : null;
  }
}

module.exports = {SearchService};
