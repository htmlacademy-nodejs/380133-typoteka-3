
const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {
  FILE_NAME,
  DEFAULT_PORT,
  SERVER_ERROR_MESSAGE,
  SERVER_SUCCESS_MESSAGE,
  NOT_FOUND_MESSAGE,
  HttpCode,
} = require(`../constants`);

const sendResponse = (res, statusCode, message) => {
  const template = `
  <!Doctype html>
<html lang="ru">
<head>
<title>With love from Node</title>
</head>
<body>${message}</body>
</html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const onClientConnect = async (req, res) => {
  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(`./${FILE_NAME}`);
        const mocks = JSON.parse(fileContent);
        const message = mocks.map((article) => `<ul><li>${article.title}</li></ul>`).join(``);
        sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (error) {
        sendResponse(res, HttpCode.NOT_FOUND, NOT_FOUND_MESSAGE);
      }
      break;

    default:
      sendResponse(res, HttpCode.NOT_FOUND, NOT_FOUND_MESSAGE);
      break;
  }
};

const server = (args) => {
  const [customPort] = args;
  const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

  http.createServer(onClientConnect)
    .listen(port)
    .on(`listening`, (error) => {
      if (error) {
        console.info(chalk.red(SERVER_ERROR_MESSAGE, error));
      }

      console.info(chalk.green(SERVER_SUCCESS_MESSAGE, port));
    });
};

module.exports = {
  name: `--server`,
  run(args) {
    server(args);
  }
};
