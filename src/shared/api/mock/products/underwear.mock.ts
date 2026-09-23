import type { Product } from '@/entities/product';

export const mockUnderwear: Product[] = [
    {
        id: 'underwear-tshirt-light-001',
        name: 'футболка белого цвета',
        description:
            'футболка белого цвета',
        image: '/images/products/underwear/tshirt-light.jpg',
        categoryId: 'uniform',
        subsCategoryId: 'tshirts',
        season: 'summer',
        avialableSizes: ['46-3', '48-3', '50-3', '52-3', '54-3'],
    },
    {
        id: 'underwear-tshirt-dark-001',
        name: 'футболка тёмно-синего цвета',
        description:
            'футболка тёмно-синего цвета',
        image: '/images/products/underwear/tshirt-dark.jpg',
        categoryId: 'uniform',
        subsCategoryId: 'tshirts',
        season: 'summer',
        avialableSizes: ['46-3', '48-3', '50-3', '52-3', '54-3'],
    }
];