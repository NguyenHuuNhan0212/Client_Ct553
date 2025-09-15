import { lazy } from 'react';
const routes = [
  {
    path: '/',
    component: lazy(() => import('../pages/HomePage/HomePage'))
  },
  {
    path: '/about',
    component: lazy(() => import('../pages/AboutUs/AboutUs'))
  },
  {
    path: 'register',
    component: lazy(() => import('../pages/Register/Register'))
  },
  {
    path: 'login',
    component: lazy(() => import('../pages/Login/Login'))
  }
];

export default routes;
