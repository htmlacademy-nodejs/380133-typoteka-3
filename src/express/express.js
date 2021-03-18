const path = require(`path`);
const express = require(`express`);

const DEFAULT_PORT = 3000;

const app = express();

app.use(`views`, path.resolve(__dirname, `templates`));
app.use(`view engine`, `pug`);

app.listen(DEFAULT_PORT);
