import tape from 'tape';

import { addTwoNumbers } from '../src/esm';


tape('esm', (assert) => {
  assert.equal(addTwoNumbers(2, 3), 5);

  assert.end();
});
