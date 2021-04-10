const {Router} = require(`express`);
const {getAPI} = require(`../api`);

const searchRouter = new Router();
const api = getAPI();

searchRouter.get(`/`, async (req, res) => {
  const {search} = req.query;

  if (!search) {
    return res.render(`pages/search`, {search});
  }

  const results = await api.search(search);

  return res.render(`pages/search`, {results, search});
});

module.exports = searchRouter;
