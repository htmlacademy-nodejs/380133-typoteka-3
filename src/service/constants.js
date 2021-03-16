const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const MAX_COUNT_MESSAGE = `Не больше 1000 публикаций`;
const ANNOUNCE_LENGTH = 5;
const FILE_NAME = `mocks.json`;
const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

// server
const DEFAULT_PORT = 3000;
const SERVER_ERROR_MESSAGE = `Ошибка при создании сервера`;
const SERVER_SUCCESS_MESSAGE = `Ожидаю соединений на `;
const NOT_FOUND_MESSAGE = `Not found`;
const HttpCode = {
  OK: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};


module.exports = {
  DEFAULT_COUNT,
  MAX_COUNT,
  MAX_COUNT_MESSAGE,
  ANNOUNCE_LENGTH,
  FILE_NAME,
  ExitCode,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  DEFAULT_PORT,
  SERVER_ERROR_MESSAGE,
  SERVER_SUCCESS_MESSAGE,
  NOT_FOUND_MESSAGE,
  HttpCode
};
