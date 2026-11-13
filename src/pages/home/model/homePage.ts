import { mockProducts } from '@/entities/product';

export function getHomePageData() {
  return { featuredProducts: mockProducts.slice(0, 4) };
}
