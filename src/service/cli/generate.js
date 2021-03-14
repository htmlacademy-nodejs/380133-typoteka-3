"use strict";

const fs = require(`fs`);
const chalk = require(`chalk`);
const {getRandomInt, shuffle, getRandomArticleDate} = require(`../../utils`);
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

const generateTitle = () => TITLES[getRandomInt(0, TITLES.length - 1)];

const generateAnnounce = () =>
  shuffle(SENTENCES).slice(1, ANNOUNCE_LENGTH).join(` `);

const generateFullText = () =>
  Array(getRandomInt(1, SENTENCES.length - 1))
    .fill(``)
    .map(() => SENTENCES[getRandomInt(1, SENTENCES.length - 1)])
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

const writeFile = async (articles) =>
  await fs.writeFileSync(FILE_NAME, JSON.stringify(articles));

const generate = async (args) => {
  const [count] = args;
  const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;

  if (count > MAX_COUNT) {
    console.info(chalk.red(MAX_COUNT_MESSAGE));
    return ExitCode.ERROR;
  }

  const articles = generateArticles(countArticles);

  try {
    await writeFile(articles);
    console.info(chalk.green(GENERATE_SUCCESS_MESSAGE));
    return ExitCode.SUCCESS;
  } catch (error) {
    console.info(chalk.red(GENERATE_ERROR_MESSAGE));
    return ExitCode.ERROR;
  }
};

module.exports = {
  name: `--generate`,
  async run(args) {
    return await generate(args);
  },
};
