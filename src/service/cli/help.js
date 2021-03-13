"use strict";

const helpText = `Гайд:
service.js <command>
Команды:
--version:            выводит номер версии
--help:               печатает этот текст
--generate <count>    формирует файл mocks.json`;

module.exports = {
  name: `--help`,
  run() {
    console.info(helpText);
  },
};
