const omit = require('object.omit');
const merge = require('deepmerge');

function mergeArray(source = [], overrides = []) {
  if (!source.length) {
    return overrides;
  }

  if (!overrides.length) {
    return source;
  }

  return overrides.reduce((reduction, override) => {
    const overrideName = Array.isArray(override) ? override[0] : override;
    const overrideOptions = Array.isArray(override) ? override[1] : {};
    const base = reduction.find((base) => {
      const baseName = Array.isArray(base) ? base[0] : base;

      if (!baseName) {
        return false;
      }

      return baseName === overrideName || baseName.includes(overrideName);
    });

    if (!base) {
      reduction.push(override);
      return reduction;
    }

    const index = reduction.indexOf(base);
    const baseName = Array.isArray(base) ? base[0] : base;
    const baseOptions = Array.isArray(base) ? base[1] : {};
    const options = merge(baseOptions, overrideOptions);

    reduction[index] = Object.keys(options).length ? [baseName, options] : baseName;

    return reduction;
  }, source);
}

function babel(source = {}, overrides = {}) {
  const plugins = mergeArray(source.plugins, overrides.plugins);
  const presets = mergeArray(source.presets, overrides.presets);

  return merge.all([
    omit(source, ['plugins', 'presets', 'env']),
    omit(overrides, ['plugins', 'presets', 'env']),
    plugins.length ? { plugins } : {},
    presets.length ? { presets } : {},
    ...[...new Set([
      ...Object.keys(source.env || {}),
      ...Object.keys(overrides.env || {})
    ])].map(name => ({
      env: {
        [name]: (() => {
          if (source.env && source.env[name] && (!overrides.env || !overrides.env[name])) {
            return source.env[name];
          }

          if (overrides.env && overrides.env[name] && (!source.env || !source.env[name])) {
            return overrides.env[name];
          }

          return babel(source.env[name], overrides.env[name]);
        })()
      }
    }))
  ]);
}

module.exports = babel;
