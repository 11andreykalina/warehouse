import type { Outfit } from './types';

export const mockOutfits: Outfit[] = [
  {
    id: 'outfit-summer-daily-001',
    name: 'Повседневная летняя форма',
    image: '/images/outfits/summer-daily.jpg',
    season: 'summer',
    purpose: 'daily',
    productIds: [
      'headwear-kepi-summer-001',
      'upperwear-polo-dark-001',
      'trousers-everyday-001',
      'socks-black-001',
      'footwear-low-shoes-001',
    ],
  },
];
