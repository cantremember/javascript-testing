/*
  "why Mocha?"
  because when i wrote this,
    Tape didn't have before & after hooks per Test, and i don't want to try-catch everything
    Mocha was happy with ESM, and Ava was not
*/
import chai from 'chai';
const { expect } = chai;

import mongodb from 'mongodb';
const { ObjectId } = mongodb;

import mongodbSandbox from 'mongodb-sandbox';
const { createSandbox } = mongodbSandbox;

import {
  VERSION,
  DATABASE_NAME,
} from '../../src/mongodb';

const sandbox = createSandbox({
  version: VERSION,
  database: DATABASE_NAME,
});

const DOCUMENT_ID = new ObjectId();


describe('mongodb', function() {
  const lifecycle = sandbox.lifecycle(this); // eslint-disable-line no-invalid-this

  before(lifecycle.beforeAll);
  beforeEach(lifecycle.beforeEach);
  afterEach(lifecycle.afterEach);
  after(lifecycle.afterAll);


  it('inserts Documents correctly', async () => {
    const client = await sandbox.client();
    const collection = client.db().collection(DATABASE_NAME);

    await collection.insertOne({
      _id: DOCUMENT_ID,
      value: 1,
    });

    const count = await collection.countDocuments({});
    expect(count).to.equal(1);

    const model = await collection.findOne({ _id: DOCUMENT_ID });
    expect(model.value).equals(1);
  });

  it('can insert a Document, since the id was purged', async () => {
    const client = await sandbox.client();
    const collection = client.db().collection(DATABASE_NAME);

    await collection.insertOne({
      _id: DOCUMENT_ID,
      value: 1,
    });
  });
});
