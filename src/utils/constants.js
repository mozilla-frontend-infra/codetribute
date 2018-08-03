export const GOOD_FIRST_BUG = 'good-first-bug';
export const MENTORED_BUG = {
  fields: 'mentor',
  operators: 'IS_NOT_EMPTY',
};
export const BUGZILLA_STATUSES = {
  NEW: 'NEW',
  UNCONFIRMED: 'UNCONFIRMED',
  ASSIGNED: 'ASSIGNED',
  REOPENED: 'REOPENED',
};
export const BUGZILLA_PAGE_SIZE = 100;
export const BUGZILLA_PAGE_NUMBER = 0;
export const BUGZILLA_ORDER = 'changeddate DESC';
export const ASSIGNEE = {
  ANY: 'Any',
  UNASSIGNED: 'Unassigned',
  ASSIGNED: 'Assigned',
};
export const ALL_PROJECTS = 'All';
export const BUGZILLA_SEARCH_OPTIONS = {
  statuses: Object.values(BUGZILLA_STATUSES),
  order: BUGZILLA_ORDER,
};
export const BUGZILLA_PAGING_OPTIONS = {
  page: BUGZILLA_PAGE_NUMBER,
  pageSize: BUGZILLA_PAGE_SIZE,
};
export const BUGZILLA_LANGUAGES = {
  'C++': 'c++',
  CSS: 'css',
  HTML: 'html',
  Java: 'java',
  JavaScript: 'js',
  Perl: 'perl',
  Python: 'py',
  Rust: 'rust',
  Shell: 'shell',
  XML: 'xml',
  XUL: 'xul',
};
export const GITHUB_LANGUAGE_QUERY_ORDER = { field: 'SIZE', direction: 'DESC' };
