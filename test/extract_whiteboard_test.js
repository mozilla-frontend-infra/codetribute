import extractWhiteboardTags from '../src/utils/extractWhiteboard';

describe('extract whiteboard tags', () => {
  it('should get the language', () => {
    const whiteboard = '[lang=js][lang=xul]';
    const result = extractWhiteboardTags(whiteboard);
    expect(result).toEqual(['lang=js', 'lang=xul']);
  });
  it('should ignore other whiteboard tag besides language', () => {
    const whiteboard = '[good-first-bug]';
    const result = extractWhiteboardTags(whiteboard);
    expect(result).toEqual([]);
  });
  it('should handle comma tag', () => {
    const whiteboard = '[lang=js,xul]';
    const result = extractWhiteboardTags(whiteboard);
    expect(result).toEqual(['lang=js', 'lang=xul']);
  });
  it('should handle OR tag', () => {
    const whiteboard = '[lang=js/xul]';
    const result = extractWhiteboardTags(whiteboard);
    expect(result).toEqual(['lang=js', 'lang=xul']);
  });
});
