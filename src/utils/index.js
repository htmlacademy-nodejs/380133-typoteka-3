const {getRandomInt} = require(`./get-random-int`);
const {shuffle} = require(`./shuffle`);
const {getRandomArticleDate} = require(`./get-article-date`);
const {getRandomElement} = require(`./get-random-element`);
const {readContent, writeContent, getContent} = require(`./files`);

module.exports = {
  getRandomInt,
  shuffle,
  getRandomArticleDate,
  getRandomElement,
  readContent,
  writeContent,
  getContent,
};
