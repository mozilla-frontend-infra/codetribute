const importer = require.context('./', true, /\.(yml|yaml)/);
const keys = [...new Set([...importer.keys()])];

module.exports = keys.reduce((prev, cur) => {
  const fileName = cur.replace(/\.yaml/, '');

  return {
    ...prev,
    [fileName]: {
      ...importer(cur),
      fileName,
    },
  };
}, {});
