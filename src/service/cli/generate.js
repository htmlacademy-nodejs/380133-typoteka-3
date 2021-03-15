const fs = require(`fs`);
const {getRandomInt, shuffle, getRandomArticleDate, getRandomElement} = require(`../../utils`);
const {
  DEFAULT_COUNT,
  MAX_COUNT,
  MAX_COUNT_MESSAGE,
  ANNOUNCE_LENGTH,
  FILE_NAME,
  TITLES,
  SENTENCES,
  CATEGORIES,
  ExitCode,
} = require(`../constants`);


const generateTitle = () => getRandomElement(TITLES);

const generateAnnounce = () =>
  shuffle(SENTENCES).slice(0, ANNOUNCE_LENGTH).join(` `);

const generateFullText = () =>
  Array(getRandomInt(0, SENTENCES.length - 1))
    .fill(``)
    .map(() => getRandomElement(SENTENCES))
    .join(` `);

const generateCategory = () => {
  const randomCategoriesAmount = getRandomInt(1, CATEGORIES.length - 1);
  return shuffle(CATEGORIES).slice(0, randomCategoriesAmount);
};

const generateArticles = (count = DEFAULT_COUNT) =>
  Array(count)
    .fill({})
    .map(() => ({
      title: generateTitle(),
      announce: generateAnnounce(),
      fullText: generateFullText(),
      сategory: generateCategory(),
      createdDate: getRandomArticleDate(),
    }));

const writeFile = (articles, cb) =>
  fs.writeFile(FILE_NAME, JSON.stringify(articles), (err) => cb(err));

const exitProgram = (err) => {
  if (err) {
    process.exit(ExitCode.ERROR);
  }

  process.exit(ExitCode.SUCCESS);
};

const generate = (args) => {
  const [count] = args;
  const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;

  if (count > MAX_COUNT) {
    console.info(MAX_COUNT_MESSAGE);
    return ExitCode.ERROR;
  }

  const articles = generateArticles(countArticles);
  writeFile(articles, exitProgram);
};

module.exports = {
  name: `--generate`,
  run(args) {
    generate(args);
  },
};
