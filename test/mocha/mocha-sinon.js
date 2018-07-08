const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;

const {
  spyable,
  stubbable,
  mockable,
} = require('../mockable');


describe('sinon', () => {
  const sandbox = sinon.createSandbox();
  afterEach(() => {
    sandbox.restore();
  });


  it('spies', () => {
    const ARG = {};
    const spy = sandbox.spy(spyable);

    expect(spy(ARG)).to.equal('spyable');

    expect(spy.called).to.equal(true);
    expect(spy.callCount).to.equal(1);
    expect(spy.args[0]).to.deep.equal([ ARG ]);
  });

  it('stubs', async () => {
    expect(stubbable.returns()).to.equal('returns');

    sandbox.stub(stubbable, 'returns').returns(5);
    sandbox.stub(stubbable, 'throws').throws(new Error('THROWS'));
    sandbox.stub(stubbable, 'resolves').resolves(23);
    sandbox.stub(stubbable, 'rejects').rejects(new Error('REJECTS'));
    sandbox.stub(stubbable, 'calls').callsFake(() => 99);

    expect(stubbable.returns()).to.equal(5);
    expect(() => {
      stubbable.throws();
    }).to.throw(/THROWS/);
    expect(
      await stubbable.resolves()
    ).to.equal(23);
    // expect(async () => {
    //   await stubbable.rejects();
    // }).to.throw(/REJECTS/);
    expect(stubbable.calls()).to.equal(99);

    expect(stubbable.returns.called).to.equal(true);
    expect(stubbable.throws.called).to.equal(true);
    expect(stubbable.resolves.called).to.equal(true);
    expect(stubbable.rejects.called).to.equal(false); // because the `throws` DSL doesn't support Promises
    expect(stubbable.calls.called).to.equal(true);
  });

  it('mocks', () => {
    const mock = sandbox.mock(mockable);

    mock.expects('single').once().returns(5);
    mock.expects('multi')
    .exactly(4)
    .returns(99)
    .onFirstCall().returns(23)
    .onCall(2).returns(86); // "onThirdCall"

    const { object } = mock;
    expect(object.single()).to.equal(5);
    expect(object.multi()).to.equal(23);
    expect(object.multi()).to.equal(99);
    expect(object.multi()).to.equal(86);
    expect(object.multi()).to.equal(99);

    mock.verify();
  });


  it('fakes time', () => {
    const clock = sandbox.useFakeTimers(0);

    expect(Date.now()).to.equal(0);

    clock.tick(123);
    expect(Date.now()).to.equal(123);
    expect((new Date()).toISOString()).to.equal('1970-01-01T00:00:00.123Z');
  });
});
