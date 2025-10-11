import { lazy } from 'react';
const routes = [
  {
    path: '/',
    component: lazy(() => import('../pages/HomePage/HomePage'))
  },
  {
    path: '/hotels',
    component: lazy(() => import('../pages/Hotel/HotelPage'))
  },
  {
    path: '/restaurants',
    component: lazy(() => import('../pages/Restaurant/RestaurantPage'))
  },
  {
    path: '/cafes',
    component: lazy(() => import('../pages/Cafe/CafePage'))
  },
  {
    path: '/touristSpots',
    component: lazy(() => import('../pages/TouristSpot/TouristSpot'))
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
    path: 'itinerary',
    component: lazy(() => import('../pages/CreateItinerary/CreateItinerary'))
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
    component: lazy(() => import('../pages/Place/PlaceDetailPage'))
  },
  {
    path: 'hotel/:id',
    component: lazy(() => import('../pages/Hotel/HotelDetailPage'))
  },
  {
    path: 'payment-return',
    component: lazy(() => import('../pages/PaymentReturn/PaymentReturn'))
  }
];

export default routes;
