const {getRandomInt} = require(`./get-random-int`);

const getRandomElement = (arr) => {
  const randomIndex = getRandomInt(0, arr.length - 1);
  return arr[randomIndex];
};

module.exports = {
  getRandomElement
};
