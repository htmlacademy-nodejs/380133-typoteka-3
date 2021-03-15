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

const writeFile = (articles) =>
  fs.writeFileSync(FILE_NAME, JSON.stringify(articles));

const generate = (args) => {
  const [count] = args;
  const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;

  if (count > MAX_COUNT) {
    console.info(MAX_COUNT_MESSAGE);
    return ExitCode.ERROR;
  }

  const articles = generateArticles(countArticles);

  try {
    writeFile(articles);
    return ExitCode.SUCCESS;
  } catch (error) {
    return ExitCode.ERROR;
  }
};

module.exports = {
  name: `--generate`,
  run(args) {
    return generate(args);
  },
};
