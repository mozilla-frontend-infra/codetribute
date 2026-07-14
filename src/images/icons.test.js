import fs from 'fs-extra';
import YAML from 'yaml';
import { join, extname, basename } from 'path';

describe('Project icons', () => {
  it('should be svg an image', () => {
    expect(
      fs.readdirSync(join('public', 'icons'))
        .every(file => extname(file) === '.svg')
    ).toBe(true);
  });
  it('should have an icon property that matches an svg image\'s name', () => {
    const icons = [];
    fs.readdirSync(join('public', 'icons')).forEach((file) => {
        const iconName = basename(file, '.svg');
        icons.push(iconName);
    });

    const projectIcons = [];
    fs.readdirSync(join('src', 'data')).forEach((file) => {
      if (file !== 'loader.js') {
        const rawData = fs.readFileSync(join('src', 'data', file), 'utf8');
        const data = YAML.parse(rawData);
        if (data.icon) {
          projectIcons.push(data.icon);
        }
      }
    });
    expect(projectIcons.every(projectIcon => icons.includes(projectIcon))).toBe(true);
  });
});
