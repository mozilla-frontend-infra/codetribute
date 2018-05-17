const importer = require.context('./', true, /\.(yml|yaml)/);
const keys = [...new Set([...importer.keys()])];

module.exports = keys.reduce((prev, cur) => {
  const paths = cur.split('/');
  const folderName = paths[1];
  const fileName = paths[2].replace(/\.yaml/, '');
  const previousData = prev[folderName] || [];

  return {
    ...prev,
    [folderName]: [
      ...previousData,
      {
        ...importer(cur),
        fileName,
      },
    ],
  };
}, {});
