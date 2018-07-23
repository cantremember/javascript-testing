const test = require('tape');
const supertest = require('supertest');

const { app } = require('../../src/express');


test('GET /plain', (t) => {
  const BODY = 'text';

  t.plan(2);

  supertest(app)
  .get('/plain')
  // variant #1
  .expect(200, BODY)
  .expect((res) => {
    const { statusCode, text } = res;

    // variant #2
    t.equal(statusCode, 200);
    t.equal(text, BODY);
  })
  .end(t.end);
});


test('GET /json', (t) => {
  const BODY = { json: true };

  t.plan(3);

  supertest(app)
  .get('/json')
  // variant #1
  .expect(200, BODY)
  .expect((res) => {
    const { statusCode, body, text } = res;

    // variant #2
    t.equal(statusCode, 200);
    t.deepEqual(body, BODY);
    t.equal(text, JSON.stringify(BODY));
  })
  .end(t.end);
});


test('POST /echo with JSON payload', (t) => {
  const SENT = { sent: 'json' };
  const BODY = { echo: SENT };

  t.plan(0);

  supertest(app)
  .post('/echo')
  .send(SENT)
  .expect(200, BODY)
  .end(t.end);
});


test('POST /json with URL-encoded payload', (t) => {
  const SENT = { sent: 'url-encoded' };
  const BODY = { echo: SENT };

  t.plan(2);

  supertest(app)
  .post('/echo')
  .send(SENT)
  .set('Content-Type', 'application/x-www-form-urlencoded')
  .set('Accept', '*')
  .expect(200)
  .expect((res) => {
    const { headers, text } = res;

    t.equal(headers['content-type'], 'application/x-www-form-urlencoded; charset=utf-8');
    t.equal(text, JSON.stringify(BODY));
  })
  .end(t.end);
});


test('non HTTP 2XX response', (t) => {
  t.plan(1);

  supertest(app)
  .get('/error')
  .expect(500, /Error: BOOM<br>/)
  .expect((res) => {
    const { headers } = res;

    t.equal(headers['content-type'], 'text/html; charset=utf-8');
  })
  .end(t.end);
});
