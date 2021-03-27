const ANNOUNCE_LENGTH = 5;
const FILE_NAME = `mocks.json`;
const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const DEFAULT_PORT = 3000;
const MAX_ID_LENGTH = 6;
const MAX_COMMENTS = 4;
const READ_FILE_ERROR_MESSAGE = `Ошибка при чтении файла`;

const ArticlesCount = {
  DEFAULT_VALUE: 1,
  MAX_VALUE: 1000,
  MAX_ERROR_MESSAGE: `Не больше 1000 публикаций`,
};

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

const FilePath = {
  SENTENCES: `./data/sentences.txt`,
  TITLES: `./data/titles.txt`,
  CATEGORIES: `./data/categories.txt`,
  COMMENTS: `./data/comments.txt`,
};

// server
const ServerMessage = {
  ERROR: `Ошибка при создании сервера`,
  SUCCESS: `Ожидаю соединений на `,
  NOT_FOUND_MESSAGE: `Not found`,
  BAD_REQUEST: `Bad request`,
};
const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
const RequestMethods = {
  GET: `GET`,
  PUT: `PUT`,
  DELETE: `DELETE`,
  POST: `POST`,
};


module.exports = {
  ANNOUNCE_LENGTH,
  FILE_NAME,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
  DEFAULT_PORT,
  READ_FILE_ERROR_MESSAGE,
  ArticlesCount,
  ExitCode,
  FilePath,
  ServerMessage,
  HttpCode,
  RequestMethods,
};
