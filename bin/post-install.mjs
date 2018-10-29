/* eslint no-console: 0 */

import mongodbSandbox from 'mongodb-sandbox';
const { installSandbox } = mongodbSandbox;

import { VERSION } from '../src/mongodb';

installSandbox({
  version: VERSION,
})
.then(() => {
  console.log(`Downloaded MongoDB ${ VERSION }.`);
});
