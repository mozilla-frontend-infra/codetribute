import { lazy } from 'react';

export default [
  {
    component: lazy(() => import('../views/Projects/index')),
    path: '/',
    exact: true,
  },
  {
    component: lazy(() => import('../views/Project/index')),
    path: '/projects/:project',
  },
  {
    component: lazy(() => import('../views/Languages/index')),
    path: '/languages/:language',
  },
];
