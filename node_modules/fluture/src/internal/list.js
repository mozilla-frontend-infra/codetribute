export var empty = ({isEmpty: true, size: 0, head: null, tail: null});

export function cons(head, tail){
  return {isEmpty: false, size: tail.size + 1, head: head, tail: tail};
}
