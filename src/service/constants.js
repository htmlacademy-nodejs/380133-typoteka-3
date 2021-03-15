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
};
