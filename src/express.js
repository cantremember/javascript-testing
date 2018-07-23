const express = require('express');
const bodyParser = require('body-parser');
const querystring = require('querystring');


const app = express();
exports.app = app;


// https://github.com/expressjs/body-parser
const BODY_PARSER_OPTIONS = {
  inflate: true,
  strict: true,
  limit: '4kb',
};

app.use(bodyParser.json(BODY_PARSER_OPTIONS));
app.use(bodyParser.raw(BODY_PARSER_OPTIONS));
app.use(bodyParser.text(Object.assign({
  defaultCharset: 'utf-8',
}, BODY_PARSER_OPTIONS)));
app.use(bodyParser.urlencoded(Object.assign({
  extended: false, // use `querystring` vs. `qs` https://github.com/ljharb/qs
  parameterLimit: 10, // if exceeded, return HTTP 413 (safety cap)
}, BODY_PARSER_OPTIONS)));


app.get('/plain', (req, res) => {
  res.status(200).send('text');
});
app.get('/json', (req, res) => {
  res.status(200).send({
    json: true,
  });
});

app.post('/echo', (req, res) => {
  const contentType = req.headers['content-type'];
  res.set('content-type', contentType);

  // respond with a JSON String regardless of Content-Type
  res.status(200).send({
    echo: req.body,
  });
});

app.get('/error', (req, res, next) => {
  next(new Error('BOOM'));
});


function main() {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT);
}
if (require.main === module) {
  main();
}
