import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '@/app/layout/AppLayout';
import { CartPage } from '@/pages/cart';
import { CatalogPage } from '@/pages/catalog';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { OrdersPage } from '@/pages/orders';
import { OutfitPage } from '@/pages/outfit';
import { OutfitsPage } from '@/pages/outfits';
import { ProductPage } from '@/pages/product';
import { ProfilePage } from '@/pages/profile';
import { SearchPage } from '@/pages/search';
import { WardrobePage } from '@/pages/wardrobe';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/catalog', element: <CatalogPage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/product/:id', element: <ProductPage /> },
      { path: '/outfit/:id', element: <OutfitPage /> },
      { path: '/outfits', element: <OutfitsPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/orders', element: <OrdersPage /> },
      { path: '/wardrobe', element: <WardrobePage /> },
      { path: '/profile', element: <ProfilePage /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);
