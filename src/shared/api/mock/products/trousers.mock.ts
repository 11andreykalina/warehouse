import type { Product } from '@/entities/product';

export const mockTrousers: Product[] = [
    {
        id: 'trousers-lightweight-001',
        name: 'Брюки повседневного облегчённого костюма',
        description:
            'Брюки повседневного облегчённого костюма тёмно-синего цвета.',
        image: '/images/products/trousers/lightweight.jpg',
        categoryId: 'uniform',
        subsCategoryId: 'trousers',
        season: 'summer',
        avialableSizes: ['46-3', '48-3', '50-3', '52-3', '54-3'],
    },
    {
        id: 'trousers-everyday-001',
        name: 'Брюки повседневного костюма',
        description:
            'Брюки повседневного костюма тёмно-синего цвета.',
        image: '/images/products/trousers/everyday.jpg',
        categoryId: 'uniform',
        subsCategoryId: 'trousers',
        season: 'summer',
        avialableSizes: ['46-3', '48-3', '50-3', '52-3', '54-3'],
    },
    {
        id: 'trousers-summer-001',
        name: 'Брюки летнего костюма',
        description:
            'Брюки летнего костюма тёмно-синего цвета.',
        image: '/images/products/trousers/summer.jpg',
        categoryId: 'uniform',
        subsCategoryId: 'trousers',
        season: 'summer',
        avialableSizes: ['46-3', '48-3', '50-3', '52-3', '54-3'],
    },
];