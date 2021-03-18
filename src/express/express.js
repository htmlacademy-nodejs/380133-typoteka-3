const express = require(`express`);
const chalk = require(`chalk`);
const {
  DEFAULT_PORT,
  SERVER_ERROR_MESSAGE,
  SERVER_SUCCESS_MESSAGE,
} = require(`./constants`);
const routes = require(`./routes`);

const app = express();

routes(app);

app.listen(DEFAULT_PORT, (error) => {
  if (error) {
    console.info(chalk.red(SERVER_ERROR_MESSAGE, error));
  }

  console.info(chalk.green(SERVER_SUCCESS_MESSAGE, DEFAULT_PORT));
});