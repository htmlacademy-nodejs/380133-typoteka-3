const chalk = require(`chalk`);
const {
  getRandomInt,
  shuffle,
  getRandomElement,
  getContent,
  writeContent
} = require(`../../utils`);
const {
  FILL_DB_FILE_NAME,
  ANNOUNCE_LENGTH,
  MAX_COMMENTS,
  ArticlesCount,
  ExitCode,
  FilePath,
} = require(`../constants`);

const users = [
  {
    email: `ivanov@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Иван`,
    lastName: `Иванов`,
    avatar: `avatar1.jpg`
  },
  {
    email: `petrov@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Пётр`,
    lastName: `Петров`,
    avatar: `avatar2.jpg`
  }
];

const parseContent = (content) => content.trim().split(`\n`);

const generateTitle = (titles) => getRandomElement(titles);

const generateAnnounce = (sentences) =>
  shuffle(sentences).slice(0, ANNOUNCE_LENGTH).join(` `);

const generateFullText = (sentences) =>
  Array(getRandomInt(0, sentences.length - 1))
    .fill(``)
    .map(() => getRandomElement(sentences))
    .join(` `);

const getComments = (allComments, articleId) => {
  const commentsAmount = getRandomInt(1, MAX_COMMENTS);

  return Array(commentsAmount).fill({}).map(() => ({
    userId: getRandomInt(1, users.length),
    articleId,
    text: shuffle(allComments).slice(0, getRandomInt(1, 3)).join(` `),
  }));
};

const generateArticles = async (count = ArticlesCount.DEFAULT_VALUE) => {
  const [sentences, titles, comments] = await Promise.all([
    getContent(FilePath.SENTENCES, parseContent),
    getContent(FilePath.TITLES, parseContent),
    getContent(FilePath.COMMENTS, parseContent)
  ]);

  return Array(count)
    .fill({})
    .map((_, index) => ({
      title: generateTitle(titles),
      announce: generateAnnounce(sentences),
      fullText: generateFullText(sentences),
      comments: getComments(comments, index + 1),
      userId: getRandomInt(1, users.length)
    }));
};

const generateData = async (count) => {
  const articles = await generateArticles(count);
  const categories = await getContent(FilePath.CATEGORIES, parseContent);

  const comments = articles.flatMap((article) => article.comments);

  const articlesCategories = articles.flatMap((_, articleIndex) => {
    const categoriesAmount = getRandomInt(1, categories.length);
    return Array(categoriesAmount)
      .fill({})
      .map(() => ({
        articleId: articleIndex + 1,
        categoryId: getRandomInt(1, categories.length)
      }));
  });

  return {
    articles,
    categories,
    comments,
    articlesCategories
  };
};

const getValues = (content) => {
  const {
    articles,
    categories,
    comments,
    articlesCategories
  } = content;

  const userValues = users.map(({email, passwordHash, firstName, lastName, avatar}) =>
    `('${email}', '${passwordHash}', '${firstName}', '${lastName}', '${avatar}')`)
    .join(`,\n`);

  const categoryValues = categories.map((name) => `('${name}')`).join(`,\n`);

  const articleValues = articles.map(({title, announce, fullText, userId}) =>
    `('${title}', '${announce}', '${fullText}', '${userId}')`)
    .join(`,\n`);

  const articleCategoryStrings = articlesCategories
    .map(
        ({articleId, categoryId}) =>
          `(${articleId}, ${categoryId})`);

  const articleCategoryValues = [...new Set(articleCategoryStrings)].join(`,\n`);

  const commentValues = comments
    .map(({text, userId, articleId}) => `('${text}', ${userId}, ${articleId})`)
    .join(`,\n`);

  return {
    userValues,
    categoryValues,
    articleValues,
    articleCategoryValues,
    commentValues
  };
};

const createContent = async (count) => {
  const data = await generateData(count);
  const values = getValues(data);

  const {userValues, categoryValues, articleValues, articleCategoryValues, commentValues} = values;

  return `
    INSERT INTO users(email, first_name, last_name, password_hash, avatar) VALUES
    ${userValues};

    INSERT INTO categories(name) VALUES
    ${categoryValues};

    ALTER TABLE articles DISABLE TRIGGER ALL;
    INSERT INTO articles(title, announce, full_text, user_id) VALUES
    ${articleValues};
    ALTER TABLE articles ENABLE TRIGGER ALL;

    ALTER TABLE comments DISABLE TRIGGER ALL;
    INSERT INTO comments(text, user_id, article_id) VALUES
    ${commentValues};
    ALTER TABLE comments ENABLE TRIGGER ALL;

    ALTER TABLE articles_categories DISABLE TRIGGER ALL;
    INSERT INTO articles_categories(article_id, category_id) VALUES
    ${articleCategoryValues};
    ALTER TABLE articles_categories ENABLE TRIGGER ALL;`.replace(/\r?\n|\r/g, ` `);
};


async function fill(args) {
  const [count] = args;
  const countArticles = Number.parseInt(count, 10) || ArticlesCount.DEFAULT_VALUE;

  if (count > ArticlesCount.MAX_VALUE) {
    console.info(chalk.red(ArticlesCount.MAX_ERROR_MESSAGE));
    process.exit(ExitCode.ERROR);
  }

  const content = await createContent(countArticles);
  try {
    await writeContent(FILL_DB_FILE_NAME, content);
    process.exit(ExitCode.SUCCESS);
  } catch (error) {
    process.exit(ExitCode.ERROR);
  }
}

module.exports = {
  name: `--fill`,
  async run(args) {
    await fill(args);
  },
};
