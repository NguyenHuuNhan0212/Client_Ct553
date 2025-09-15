import { lazy } from 'react';
const routes = [
  {
    path: '/',
    component: lazy(() => import('../pages/HomePage/HomePage'))
  },
  {
    path: '/about',
    component: lazy(() => import('../pages/AboutUs/AboutUs'))
  }
];

export default routes;
