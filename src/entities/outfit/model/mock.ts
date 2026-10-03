import type { Outfit } from './types';

export const mockOutfits: Outfit[] = [
  {
    id: 'outfit-summer-daily-001',
    name: 'Повседневная летняя форма',
    image: '/images/outfits/summer-daily.jpeg',
    season: 'summer',
    purpose: 'daily',
    service: 'general',
    gender: 'male',
    productIds: [
      'cap-summer-001',
      'polo-dark-blue-001',
      'lightweight-trousers-001',
      'black-socks-001',
      'black-shoes-001',
    ],
  },
  {
    id: 'outfit-summer-long-sleeve-001',
    name: 'Летняя форма с длинным рукавом',
    image: '',
    season: 'summer',
    purpose: 'daily',
    service: 'general',
    gender: 'male',
    productIds: [
      'cap-summer-001',
      'summer-suit-jacket-001',
      'summer-suit-trousers-001',
      'black-socks-001',
      'black-shoes-001',
    ],
  },
  {
    id: 'outfit-winter-daily-001',
    name: 'Повседневная зимняя форма',
    image: '',
    season: 'winter',
    purpose: 'daily',
    service: 'general',
    gender: 'male',
    productIds: [],
  },
];
