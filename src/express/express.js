const path = require(`path`);
const express = require(`express`);
const chalk = require(`chalk`);
const {
  DEFAULT_PORT,
  SERVER_ERROR_MESSAGE,
  SERVER_SUCCESS_MESSAGE,
  PUBLIC_DIR,
} = require(`./constants`);
const routes = require(`./routes`);

const app = express();

// routes
routes(app);

// public
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

// views
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(DEFAULT_PORT, (error) => {
  if (error) {
    console.info(chalk.red(SERVER_ERROR_MESSAGE, error));
  }

  console.info(chalk.green(SERVER_SUCCESS_MESSAGE, DEFAULT_PORT));
});
