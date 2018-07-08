import test from 'tape';

import { addTwoNumbers } from '../../src/esm';


test('esm', (t) => {
  t.plan(1);

  t.equal(addTwoNumbers(2, 3), 5);

  t.end();
});
