const extractWhiteboardTags = whiteboard => {
  // find occurence like lang=perl,js or lang=perl/js
  const re = /(\w+)=(\w+)[,|/](\w+)/;
  // find all element within square bracket starting with lang with as little
  // string as possible inside
  const keywords = (whiteboard.match(/\[lang.+?\]/g) || []).reduce(
    (prev, item) => {
      // remove the square bracket
      const itemWithoutBracket = item.slice(1, -1);
      const items = itemWithoutBracket.match(re);

      // if there is no comma or /
      if (!items) {
        return [...prev, itemWithoutBracket];
      }

      // items=["lang=js/xul","lang","js","xul"]
      // so start looping from 3rd element
      return [
        ...prev,
        ...items.slice(2).map(element => `${items[1]}=${element}`),
      ];
    },
    []
  );

  return keywords;
};

export default extractWhiteboardTags;
