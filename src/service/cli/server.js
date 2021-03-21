
const express = require(`express`);
const chalk = require(`chalk`);
const routes = require(`./routes`);
const {
  DEFAULT_PORT,
  ServerMessage,
} = require(`../constants`);


const server = () => {
  const app = express();

  app.use(express.json());

  // routes
  routes(app);

  app.listen(DEFAULT_PORT, (error) => {
    if (error) {
      console.info(chalk.red(ServerMessage.ERROR, error));
    }

    console.info(chalk.green(ServerMessage.SUCCESS, DEFAULT_PORT));
  });
};

module.exports = {
  name: `--server`,
  run() {
    server();
  }
};
