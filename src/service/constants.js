const ArticlesCount = {
  DEFAULT_VALUE: 1,
  MAX_VALUE: 1000,
  MAX_ERROR_MESSAGE: `Не больше 1000 публикаций`,
};
const ANNOUNCE_LENGTH = 5;
const FILE_NAME = `mocks.json`;
const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

const FilePath = {
  SENTENCES: `./data/sentences.txt`,
  TITLES: `./data/titles.txt`,
  CATEGORIES: `./data/categories.txt`,
};

// server
const DEFAULT_PORT = 3000;
const ServerMessage = {
  ERROR: `Ошибка при создании сервера`,
  SUCCESS: `Ожидаю соединений на `,
  NOT_FOUND_MESSAGE: `Not found`,
};
const HttpCode = {
  OK: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};


module.exports = {
  ArticlesCount,
  ANNOUNCE_LENGTH,
  FILE_NAME,
  ExitCode,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  FilePath,
  DEFAULT_PORT,
  ServerMessage,
  HttpCode
};
