import fs from 'fs-extra';
import { join, extname, basename } from 'path';

describe('project icons', () => {
  it('should have svg extensions', async () => {
    const extensions = fs
      .readdirSync(join('src', 'images', 'projectIcons'))
      .map(extname);

    expect(extensions.every((ext) => ext === '.svg')).toEqual(true);
  });
  it('should have the same name as its configuration file', () => {
    const iconNames = fs
      .readdirSync(join('src', 'images', 'projectIcons'))
      .map((file) => basename(file, '.svg'));
    const projectNames = fs
      .readdirSync(join('src', 'data'))
      .map((file) => basename(file, '.yaml'));

    expect(iconNames.every((name) => projectNames.includes(name))).toEqual(
      true
    );
  });
});
