/* global expect, jest */
/* global SharedArrayBuffer, Atomics */

const {
  spyable,
  stubbable,
} = require('../mockable');


afterEach(() => {
  jest.restoreAllMocks();

  jest.clearAllTimers();
  jest.useRealTimers();
});


it('spies', () => {
  const ARG = {};
  const spy = jest.fn(spyable);

  expect(jest.isMockFunction(spyable)).toBe(false);
  expect(jest.isMockFunction(spy)).toBe(true);

  expect(spy(ARG)).toBe('spyable');

  const { mock } = spy;
  expect(mock.calls.length).toBe(1);
  expect(mock.calls[0]).toEqual([ ARG ]);
  expect(mock.results[0]).toEqual({
    isThrow: false,
    value: 'spyable',
  });
});

it('stubs', async () => {
  expect(stubbable.returns()).toBe('returns');

  jest.spyOn(stubbable, 'returns').mockReturnValue(5);
  jest.spyOn(stubbable, 'throws').mockImplementation(() => { throw new Error('THROWS'); });
  jest.spyOn(stubbable, 'resolves').mockResolvedValue(23);
  jest.spyOn(stubbable, 'rejects').mockRejectedValue(new Error('REJECTS'));
  jest.spyOn(stubbable, 'calls').mockImplementation(() => 99);

  expect(stubbable.returns()).toBe(5);
  expect(() => {
    stubbable.throws();
  }).toThrow(/THROWS/);
  expect(
    await stubbable.resolves()
  ).toBe(23);
  // expect(async () => {
  //   await stubbable.rejects();
  // }).toThrow(/REJECTS/);
  expect(stubbable.calls()).toBe(99);

  expect(stubbable.returns).toHaveBeenCalledTimes(1);
  expect(stubbable.throws).toHaveBeenCalledTimes(1);
  expect(stubbable.resolves).toHaveBeenCalledTimes(1);
  expect(stubbable.rejects).not.toHaveBeenCalled(); // because the `throws` DSL doesn't support Promises
  expect(stubbable.calls).toHaveBeenCalledTimes(1);
});

it('mocks', () => {
  try {
    jest.mock('../mockable');

    const mocked = require('../mockable'); // eslint-disable-line global-require

    expect(mocked.spyable()).not.toBeDefined();
    expect(mocked.stubbable.returns()).not.toBeDefined();
  }
  finally {
    jest.unmock('../mockable');
  }
});


it('fakes time', () => {
  const buffer = new SharedArrayBuffer(4);
  const counts = new Uint8Array(buffer).fill(0);
  function onInterval() { Atomics.add(counts, 0, 1); }
  function onTimeout() { Atomics.add(counts, 1, 1); }
  function onImmediate() { Atomics.add(counts, 2, 1); }
  function onTick() { Atomics.add(counts, 3, 1); }
  function expectCounts({ interval, timeout, immediate, tick }) {
    expect(counts[0]).toBe(interval);
    expect(counts[1]).toBe(timeout);
    expect(counts[2]).toBe(immediate);
    expect(counts[3]).toBe(tick);
  }

  jest.useFakeTimers();
  expect(Date.now()).toBeGreaterThan(1234567890); // it does NOT mock core time

  expectCounts({ interval: 0, timeout: 0, immediate: 0, tick: 0 });

  const attachInterval = (function() {
    let interval;
    let attachments = 0;

    return function() {
      attachments += 1;
      const target = (attachments * 5);

      interval = setInterval(() => {
        onInterval();

        if (counts[0] === target) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 0);
    };
  })();

  attachInterval();
  setTimeout(onTimeout, 0);
  setImmediate(onImmediate);
  process.nextTick(onTick);

  jest.runAllTicks();
  expectCounts({ interval: 0, timeout: 0, immediate: 0, tick: 1 });
  process.nextTick(onTick);

  jest.runAllImmediates();
  expectCounts({ interval: 0, timeout: 0, immediate: 1, tick: 1 });
  setImmediate(onImmediate);

  jest.runOnlyPendingTimers();
  expectCounts({ interval: 1, timeout: 1, immediate: 2, tick: 1 });
  setTimeout(onTimeout, 0);
  setImmediate(onImmediate);

  jest.advanceTimersByTime(123);
  expectCounts({ interval: 5, timeout: 2, immediate: 2, tick: 1 });
  attachInterval();
  setTimeout(onTimeout, 0);

  jest.runAllTimers();
  expectCounts({ interval: 10, timeout: 3, immediate: 3, tick: 2 });
});
