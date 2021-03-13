"use strict";

const {MONTH_DIFF_PERIOD} = require(`./constants`);

const getStartAndEndDates = () => {
  const end = Date.now();
  const startMonth = new Date(end).getMonth() - MONTH_DIFF_PERIOD;
  const start = new Date(end).setMonth(startMonth);

  return {
    start,
    end,
  };
};

const getRandomDate = (from, to) =>
  new Date(from + Math.random() * (to - from));

const formatDate = (date) => date.toISOString();

const getRandomArticleDate = () => {
  const {start, end} = getStartAndEndDates();
  const randomDate = getRandomDate(start, end);
  return formatDate(randomDate);
};

module.exports = {
  getRandomArticleDate,
};
