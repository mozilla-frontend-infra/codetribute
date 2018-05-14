const merge = require('deepmerge');
const runAll = require('lint-staged/src/runAll');
const printErrors = require('lint-staged/src/printErrors');

module.exports = (neutrino, opts = {}) => {
  if (neutrino.options.command === 'stage') {
    global.interactive = false;
  }

  const options = merge(
    {
      concurrent: true,
      chunkSize: Number.MAX_SAFE_INTEGER,
      globOptions: {
        matchBase: true,
        dot: true,
      },
      linters: {},
      ignore: [],
      subTaskConcurrency: 1,
      renderer: 'update',
    },
    opts
  );

  if (!Object.keys(options.linters).length) {
    options.linters['*.{js,jsx}'] = ['neutrino lint'];
  }

  neutrino.register(
    'stage',
    () =>
      runAll(options)
        .then(() => process.exit())
        .catch(error => {
          printErrors(error);
          process.exit(1);
        }),
    'Run commands on git staged files using lint-staged'
  );
};
