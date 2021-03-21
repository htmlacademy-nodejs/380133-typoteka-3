const {Router} = require(`express`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {
  FILE_NAME,
  ServerMessage,
} = require(`../constants`);

const router = new Router();

router.get(`/posts`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(`./${FILE_NAME}`);
    const mocks = JSON.parse(fileContent);

    return res.send(mocks);
  } catch (error) {
    console.info(chalk.red(ServerMessage.NOT_FOUND_MESSAGE, error));
    return res.send([]);
  }
});

const routes = (app) => {
  app.use(`/`, router);
};

module.exports = routes;
