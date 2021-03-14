"use strict";

const fs = require(`fs`);
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
    generate(args);
  },
};
