const {nanoid} = require(`nanoid`);
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
  MAX_ID_LENGTH,
  ANNOUNCE_LENGTH,
  FILE_NAME,
  MAX_COMMENTS,
  ArticlesCount,
  ExitCode,
  FilePath,
} = require(`../constants`);

const parseContent = (content) => content.trim().split(`\n`);

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

const getComments = (allComments) => {
  const commentsAmount = getRandomInt(1, MAX_COMMENTS);

  return Array(commentsAmount).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(allComments).slice(0, getRandomInt(1, 3)).join(` `),
  }));
};

const generateArticles = async (count = ArticlesCount.DEFAULT_VALUE) => {
  const [sentences, categories, titles, comments] = await Promise.all([
    getContent(FilePath.SENTENCES, parseContent),
    getContent(FilePath.CATEGORIES, parseContent),
    getContent(FilePath.TITLES, parseContent),
    getContent(FilePath.COMMENTS, parseContent)
  ]);

  return Array(count)
    .fill({})
    .map(() => ({
      id: nanoid(MAX_ID_LENGTH),
      title: generateTitle(titles),
      announce: generateAnnounce(sentences),
      fullText: generateFullText(sentences),
      createdDate: getRandomArticleDate(),
      category: generateCategory(categories),
      comments: getComments(comments),
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
