
const express = require(`express`);
const chalk = require(`chalk`);
const routes = require(`./routes`);
const {
  DEFAULT_PORT,
  SERVER_ERROR_MESSAGE,
  SERVER_SUCCESS_MESSAGE,
} = require(`../constants`);


const server = () => {
  const app = express();

  app.use(express.json());

  // routes
  routes(app);

  app.listen(DEFAULT_PORT, (error) => {
    if (error) {
      console.info(chalk.red(SERVER_ERROR_MESSAGE, error));
    }

    console.info(chalk.green(SERVER_SUCCESS_MESSAGE, DEFAULT_PORT));
  });
};

module.exports = {
  name: `--server`,
  run() {
    server();
  }
};
