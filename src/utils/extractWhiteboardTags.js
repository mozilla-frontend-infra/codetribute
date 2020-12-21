// Find whiteboard tags of the form:
// [lang=js][lang=xul]
// [lang=js,xul]
// [lang=js/xul]
export default (whiteboard) => {
  if (!whiteboard) {
    return [];
  }

  const re = /(\w+)=(\w+)[,|/]\s?(\w+)/;
  // find all element within square bracket starting with lang with as little
  // string as possible inside
  const keywords = (whiteboard.match(/\[lang=.+?\]/g) || []).reduce(
    (acc, item) => {
      // remove the square brackets
      const itemWithoutBracket = item.slice(1, -1);
      const items = itemWithoutBracket.match(re);

      // if there is no comma or /
      if (!items) {
        return [...acc, itemWithoutBracket];
      }

      // items=["lang=js/xul","lang","js","xul"]
      // so start looping from 3rd element
      return [
        ...acc,
        ...items.slice(2).map((element) => `${items[1]}=${element}`),
      ];
    },
    []
  );

  return keywords;
};
