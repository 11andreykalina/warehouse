export type WardrobeItem = {
  id: string;
  productId: string;
  name: string;
  image: string;
  season: 'all-season' | 'summer' | 'demi-season' | 'winter';
  category: string;
  size: string;
  issuedAt: string;
  wearPeriodDays: number;
  expiresAt: string;
  status: 'active' | 'archived';
  archivedAt?: string;
  archiveReason?: 'expired' | 'manual';
  sourceOrderId?: string;
  sourceOrderItemId?: string;
};
