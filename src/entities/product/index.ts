export type {
  Product,
  ProductEntitlement,
  ProductSeason,
  WearPeriodUnit,
} from './model/types';
export { mockProducts } from './model/mock';
export {
  getApplicableProductEntitlements,
  getProductWearEntitlement,
} from './model/eligibility';
export { formatProductEntitlement, formatWearPeriod } from './model/labels';
export { ProductCard } from './ui/ProductCard';
