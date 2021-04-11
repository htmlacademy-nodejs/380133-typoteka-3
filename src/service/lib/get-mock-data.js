const fileSystem = require(`fs`);
const fs = require(`fs`).promises;
const path = require(`path`);
const chalk = require(`chalk`);
const {FILE_NAME, READ_FILE_ERROR_MESSAGE} = require(`../constants`);

let data = null;

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  if (!fileSystem.existsSync(FILE_NAME)) {
    return Promise.resolve([]);
  }

  try {
    const fileContent = await fs.readFile(path.resolve(__dirname, `../../../${FILE_NAME}`), `utf8`);
    data = JSON.parse(fileContent);
  } catch (error) {
    console.info(chalk.red(READ_FILE_ERROR_MESSAGE));
    return Promise.reject(error);
  }

  return Promise.resolve(data);
};

module.exports = {getMockData};
