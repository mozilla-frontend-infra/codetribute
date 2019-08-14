import { compareAsc, parseISO, isDate } from 'date-fns';
import { or } from 'ramda';

/**
 * Return a negative number if the reference element occurs before
 * the compare element; positive if the reference element occurs
 * after the compare element; 0 if they are equivalent.
 */
const sort = (referenceElement, compareElement) => {
  if (
    typeof referenceElement === 'number' &&
    typeof compareElement === 'number'
  ) {
    const diff = referenceElement - compareElement;

    if (diff === 0) {
      return 0;
    }

    return diff < 0 ? -1 : 1;
  }

  const reference = isDate(referenceElement)
    ? parseISO(referenceElement)
    : referenceElement;
  const compare = isDate(compareElement)
    ? parseISO(compareElement)
    : compareElement;

  if (isDate(referenceElement) || isDate(compareElement)) {
    return compareAsc(reference, compare);
  }

  return or(reference, '').localeCompare(compare);
};

export default sort;
