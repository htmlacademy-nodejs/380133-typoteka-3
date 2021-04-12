const DEFAULT_PORT = 8080;
const DEFAULT_API_PORT = 3000;
const PUBLIC_DIR = `public`;
const PUBLIC_UPLOAD_DIR = `upload`;
const UPLOAD_DIR = `../upload/img/`;
const TIMEOUT = 1000;

const ServerMessage = {
  ERROR: `Ошибка при создании сервера`,
  SUCCESS: `Ожидаю соединений на `,
  LOAD_ERROR: `Server connection error`,
};

module.exports = {
  DEFAULT_PORT,
  DEFAULT_API_PORT,
  PUBLIC_DIR,
  PUBLIC_UPLOAD_DIR,
  UPLOAD_DIR,
  TIMEOUT,
  ServerMessage,
};
