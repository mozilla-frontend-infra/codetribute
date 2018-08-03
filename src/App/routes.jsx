import loadable from '../utils/loadable';

export default [
  {
    component: loadable(() => import('../views/Projects/index')),
    path: '/',
    exact: true,
  },
  {
    component: loadable(() => import('../views/Project/index')),
    path: '/projects/:project',
  },
  {
    component: loadable(() => import('../views/Languages/index')),
    path: '/languages/:language',
  },
];
