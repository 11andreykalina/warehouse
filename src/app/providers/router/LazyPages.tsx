import { lazy } from 'react';

const CartPage = lazy(() => import('@/pages/cart').then((module) => ({ default: module.CartPage })));
const CatalogPage = lazy(() =>
  import('@/pages/catalog').then((module) => ({ default: module.CatalogPage })),
);
const HomePage = lazy(() => import('@/pages/home').then((module) => ({ default: module.HomePage })));
const LoginPage = lazy(() => import('@/pages/login').then((module) => ({ default: module.LoginPage })));
const OrdersPage = lazy(() =>
  import('@/pages/orders').then((module) => ({ default: module.OrdersPage })),
);
const OutfitPage = lazy(() =>
  import('@/pages/outfit').then((module) => ({ default: module.OutfitPage })),
);
const OutfitsPage = lazy(() =>
  import('@/pages/outfits').then((module) => ({ default: module.OutfitsPage })),
);
const ProductPage = lazy(() =>
  import('@/pages/product').then((module) => ({ default: module.ProductPage })),
);
const ProfilePage = lazy(() =>
  import('@/pages/profile').then((module) => ({ default: module.ProfilePage })),
);
const SearchPage = lazy(() =>
  import('@/pages/search').then((module) => ({ default: module.SearchPage })),
);
const WardrobePage = lazy(() =>
  import('@/pages/wardrobe').then((module) => ({ default: module.WardrobePage })),
);

export function CartRoute() {
  return <CartPage />;
}

export function CatalogRoute() {
  return <CatalogPage />;
}

export function HomeRoute() {
  return <HomePage />;
}

export function LoginRoute() {
  return <LoginPage />;
}

export function OrdersRoute() {
  return <OrdersPage />;
}

export function OutfitRoute() {
  return <OutfitPage />;
}

export function OutfitsRoute() {
  return <OutfitsPage />;
}

export function ProductRoute() {
  return <ProductPage />;
}

export function ProfileRoute() {
  return <ProfilePage />;
}

export function SearchRoute() {
  return <SearchPage />;
}

export function WardrobeRoute() {
  return <WardrobePage />;
}
