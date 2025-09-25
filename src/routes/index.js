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
  },
  {
    path: 'services',
    component: lazy(() => import('../pages/Service/Service'))
  },
  {
    path: 'forgot-password',
    component: lazy(() => import('../pages/ForgotPassword/ForgotPassword'))
  },
  {
    path: 'reset-password/:token',
    component: lazy(() => import('../pages/ResetPassword/ResetPassword'))
  },
  {
    path: 'profile',
    component: lazy(() => import('../pages/Profile/Profile'))
  },
  {
    path: 'add-place',
    component: lazy(() => import('../pages/AddPlace/AddPlace'))
  },
  {
    path: 'place/:id',
    component: lazy(() => import('../pages/Place/PlaceDetail'))
  }
];

export default routes;
