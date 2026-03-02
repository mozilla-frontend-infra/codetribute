import { lazy } from 'react';

const routes = [
  {
    component: lazy(() => import('../views/Projects/index')),
    path: '/',
    exact: true,
  },
  {
    path: '/projects/ff',
    redirect: '/projects/firefox-frontend',
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

export default routes;
