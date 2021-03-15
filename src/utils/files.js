const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  READ_FILE_ERROR_MESSAGE,
  WRITE_FILE_ERROR_MESSAGE,
  WRITE_FILE_SUCCESS_MESSAGE
} = require(`./constants`);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content;
  } catch (error) {
    console.info(chalk.red(READ_FILE_ERROR_MESSAGE));
    throw error;
  }
};

const writeContent = async (fileName, articles) => {
  try {
    await fs.writeFile(fileName, JSON.stringify(articles));
    console.info(chalk.green(WRITE_FILE_SUCCESS_MESSAGE));
  } catch (error) {
    console.info(chalk.red(WRITE_FILE_ERROR_MESSAGE, error));
    throw error;
  }
};

const getContent = async (filePath, parseCallback) => {
  try {
    const content = await readContent(filePath);
    return parseCallback(content);
  } catch (error) {
    return [];
  }
};

module.exports = {
  readContent,
  writeContent,
  getContent,
};
