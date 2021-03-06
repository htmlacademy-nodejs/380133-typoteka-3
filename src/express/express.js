const path = require(`path`);
const express = require(`express`);
const chalk = require(`chalk`);
const {
  DEFAULT_PORT,
  PUBLIC_DIR,
  PUBLIC_UPLOAD_DIR,
  ServerMessage,
} = require(`./constants`);
const routes = require(`./routes`);

const app = express();

// routes
routes(app);

// public
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, PUBLIC_UPLOAD_DIR)));

// views
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(DEFAULT_PORT, (error) => {
  if (error) {
    console.info(chalk.red(ServerMessage.ERROR, error));
  }

  console.info(chalk.green(ServerMessage.SUCCESS, DEFAULT_PORT));
});
