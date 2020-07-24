const hasNextPage = pageCursors => {
  return (
    Object.keys(pageCursors.github).some(
      x => pageCursors.github[x].hasNextPage
    ) ||
    Object.keys(pageCursors.bzGoodFirst).some(
      x => pageCursors.bzGoodFirst[x].hasNextPage
    ) ||
    Object.keys(pageCursors.bzMentored).some(
      x => pageCursors.bzMentored[x].hasNextPage
    )
  );
};

export default hasNextPage;
