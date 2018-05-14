const { inspect } = require('util');
const yaml = require('js-yaml');

module.exports = function(source) {
  this.cacheable && this.cacheable();

  try {
    const res = yaml.safeLoad(source);
    return `module.exports = ${inspect(res, { depth: null })}`;
  } catch (err) {
    this.emitError(err);
    return null;
  }
};
