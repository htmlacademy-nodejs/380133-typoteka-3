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
  ArticlesCount,
  ANNOUNCE_LENGTH,
  FILE_NAME,
  ExitCode,
  FilePath,
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

const generateArticles = async (count = ArticlesCount.DEFAULT_VALUE) => {
  const [sentences, categories, titles] = await Promise.all([
    getContent(FilePath.SENTENCES, parseContent),
    getContent(FilePath.CATEGORIES, parseContent),
    getContent(FilePath.TITLES, parseContent)
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
  const countArticles = Number.parseInt(count, 10) || ArticlesCount.DEFAULT_VALUE;

  if (count > ArticlesCount.MAX_VALUE) {
    console.info(chalk.red(ArticlesCount.MAX_ERROR_MESSAGE));
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
