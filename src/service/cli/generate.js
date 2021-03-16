const chalk = require(`chalk`);
const {
  getRandomInt,
  shuffle,
  getRandomArticleDate,
  getRandomElement,
  getContent,
  writeContent
} = require(`../../utils`);
const {
  DEFAULT_COUNT,
  MAX_COUNT,
  MAX_COUNT_MESSAGE,
  ANNOUNCE_LENGTH,
  FILE_NAME,
  ExitCode,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
} = require(`../constants`);

const parseContent = (content) => content.split(`\n`);

const generateTitle = (titles) => getRandomElement(titles);

const generateAnnounce = (sentences) =>
  shuffle(sentences).slice(0, ANNOUNCE_LENGTH).join(` `);

const generateFullText = (sentences) =>
  Array(getRandomInt(0, sentences.length - 1))
    .fill(``)
    .map(() => getRandomElement(sentences))
    .join(` `);

const generateCategory = (categories) => {
  const randomCategoriesAmount = getRandomInt(1, categories.length - 1);
  return shuffle(categories).slice(0, randomCategoriesAmount);
};

const generateArticles = async (count = DEFAULT_COUNT) => {
  const [sentences, categories, titles] = await Promise.all([
    getContent(FILE_SENTENCES_PATH, parseContent),
    getContent(FILE_CATEGORIES_PATH, parseContent),
    getContent(FILE_TITLES_PATH, parseContent)
  ]);

  return Array(count)
    .fill({})
    .map(() => ({
      title: generateTitle(titles),
      announce: generateAnnounce(sentences),
      fullText: generateFullText(sentences),
      сategory: generateCategory(categories),
      createdDate: getRandomArticleDate(),
    }));
};


async function generate(args) {
  const [count] = args;
  const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;

  if (count > MAX_COUNT) {
    console.info(chalk.red(MAX_COUNT_MESSAGE));
    process.exit(ExitCode.ERROR);
  }

  const articles = await generateArticles(countArticles);
  try {
    await writeContent(FILE_NAME, articles);
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
