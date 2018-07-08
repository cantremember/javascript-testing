function _echoes(string) {
  return function() {
    return string;
  };
}

const spyable = _echoes('spyable');

const stubbable = {
  returns: _echoes('returns'),
  throws: _echoes('throws'),
  resolves: _echoes('resolves'),
  rejects: _echoes('rejects'),
  calls: _echoes('calls'),
};

const mockable = {
  single: _echoes('single'),
  multi: _echoes('multi'),
};


exports = module.exports = {
  spyable,
  stubbable,
  mockable,
};
