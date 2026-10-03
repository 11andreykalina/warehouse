import { Suspense } from 'react';
import { Box } from '@mui/material';
import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '@/app/layout/AppLayout';
import {
  CartRoute,
  CatalogRoute,
  HomeRoute,
  LoginRoute,
  OrdersRoute,
  OutfitRoute,
  OutfitsRoute,
  ProductRoute,
  ProfileRoute,
  SearchRoute,
  WardrobeRoute,
} from './LazyPages';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomeRoute /> },
      { path: '/catalog', element: <CatalogRoute /> },
      { path: '/search', element: <SearchRoute /> },
      { path: '/product/:id', element: <ProductRoute /> },
      { path: '/outfit/:id', element: <OutfitRoute /> },
      { path: '/outfits', element: <OutfitsRoute /> },
      { path: '/cart', element: <CartRoute /> },
      { path: '/orders', element: <OrdersRoute /> },
      { path: '/wardrobe', element: <WardrobeRoute /> },
      { path: '/profile', element: <ProfileRoute /> },
    ],
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<Box role="status" sx={{ minHeight: '40vh' }} />}>
        <LoginRoute />
      </Suspense>
    ),
  },
]);
