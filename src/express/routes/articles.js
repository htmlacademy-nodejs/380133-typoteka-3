const path = require(`path`);
const multer = require(`multer`);
const {Router} = require(`express`);
const {nanoid} = require(`nanoid`);
const {getAPI} = require(`../api`);
const {UPLOAD_DIR} = require(`../constants`);

const articlesRouter = new Router();
const api = getAPI();

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

articlesRouter.post(`/add`,
    upload.single(`avatar`),
    async (req, res) => {
      const {body, file} = req;

      const newArticle = {
        picture: file.filename,
        title: body.title,
        announce: body.announcement,
        createdDate: body.date,
        fullText: body[`full-text`],
        category: Array.isArray(body.category) ? body.category : [body.category],
      };

      try {
        await api.createArticle(newArticle);
        return res.redirect(`/my`);
      } catch (error) {
        const categories = await api.getCategories();
        return res.render(`./components/new-post`, {
          article: newArticle,
          categories,
        });
      }
    }
);

articlesRouter.get(`/add`, async (req, res) => {
  const categories = await api.getCategories();

  return res.render(`./components/new-post`, {categories});
});


articlesRouter.get(`/category/:id`, (req, res) => res.render(`./components/articles-by-category`));

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;

  const [article, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories(),
  ]);

  return res.render(`./components/new-post`, {article, categories});
});

articlesRouter.get(`/:id`, (req, res) => res.send(`/articles/:id`));

module.exports = articlesRouter;
