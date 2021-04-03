const express = require(`express`);
const {router} = require(`../api`);
const {getLogger} = require(`../lib/logger`);
const {
  DEFAULT_PORT,
  ServerMessage,
  HttpCode,
} = require(`../constants`);

const logger = getLogger({name: `api`});

const server = () => {
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
    logger.debug(`${ServerMessage.REQUEST_ON_ROUTE} ${req.url}`);

    res.on(`finish`, () => {
      logger.info(`${ServerMessage.RESPONSE_STATUS_CODE} ${res.statusCode}`);
    });

    next();
  });

  // routes
  app.use(`/api`, router);


  app.use((error, _req, _res, _next) => {
    logger.error(`${ServerMessage.ERROR} ${error}`);
  });

  app.use((req, res) => {
    res.status(HttpCode.NOT_FOUND).send(ServerMessage.NOT_FOUND_MESSAGE);

    logger.error(`${ServerMessage.ROUTE_NOT_FOUND} ${req.url}`);
  });

  app.listen(DEFAULT_PORT, (error) => {
    if (error) {
      logger.error(`${ServerMessage.START_SERVER_ERROR}: ${error}`);
    }

    logger.info(`${ServerMessage.SUCCESS}: ${DEFAULT_PORT}`);
  });
};

module.exports = {
  name: `--server`,
  run() {
    server();
  }
};
