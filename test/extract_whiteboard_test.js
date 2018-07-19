import extractWhiteboardTags from '../src/utils/extractWhiteboardTags';

describe('extract whiteboard tags', () => {
  it('should extract languages from [lang=js][lang=xul]', () => {
    const result = extractWhiteboardTags('[lang=js][lang=xul]');
    expect(result).toEqual(['lang=js', 'lang=xul']);
  });
  it('should extract languages from [lang=js][lang=xul][good-first-bug]', () => {
    const result = extractWhiteboardTags('[lang=js][lang=xul][good-first-bug]');
    expect(result).toEqual(['lang=js', 'lang=xul']);
  });
  it('should extract languages from [lang=js,xul]', () => {
    const result = extractWhiteboardTags('[lang=js,xul]');
    expect(result).toEqual(['lang=js', 'lang=xul']);
  });
  it('should extract languages from [lang=js/xul]', () => {
    const result = extractWhiteboardTags('[lang=js/xul]');
    expect(result).toEqual(['lang=js', 'lang=xul']);
  });
  it('should extract languages from [lang=js, xul]', () => {
    const result = extractWhiteboardTags('[lang=js, xul]');
    expect(result).toEqual(['lang=js', 'lang=xul']);
  });
});
