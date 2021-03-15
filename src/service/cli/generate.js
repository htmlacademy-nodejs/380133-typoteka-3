const fs = require(`fs`).promises;
const chalk = require(`chalk`);
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
  GENERATE_ERROR_MESSAGE,
  GENERATE_SUCCESS_MESSAGE,
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

const writeFile = async (fileName, articles) => {
  try {
    await fs.writeFile(fileName, JSON.stringify(articles));

    console.info(chalk.green(GENERATE_SUCCESS_MESSAGE));
  } catch (error) {
    console.info(chalk.red(GENERATE_ERROR_MESSAGE, error));
  }
};

async function generate(args) {
  const [count] = args;
  const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;

  if (count > MAX_COUNT) {
    console.info(chalk.red(MAX_COUNT_MESSAGE));
    process.exit(ExitCode.ERROR);
  }

  const articles = generateArticles(countArticles);
  try {
    await writeFile(FILE_NAME, articles);
    process.exit(ExitCode.SUCCESS);
  } catch (error) {
    process.exit(ExitCode.ERROR);
  }
}

module.exports = {
  name: `--generate`,
  async run(args) {
    await generate(args);
  },
};
