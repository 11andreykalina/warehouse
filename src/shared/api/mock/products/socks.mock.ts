import type { Product } from '@/entities/product';

export const mockSocks: Product[] = [
    {
        id: 'socks-black-001',
        name: 'Носки чёрные',
        description:
            'Форменные носки чёрного цвета.',
        image: '/images/products/socks/black.jpg',
        categoryId: 'accessories',
        subsCategoryId: 'socks',
        season: 'summer',
        avialableSizes: ['25', '27', '29'],
    },
];