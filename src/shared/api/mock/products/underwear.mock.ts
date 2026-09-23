import type { Product } from '@/entities/product';

export const mockUnderwear: Product[] = [
    {
        id: 'underwear-tshirt-light-001',
        name: 'Майка светлая',
        description:
            'Майка светлого цвета для ношения под форменной одеждой.',
        image: '/images/products/underwear/tshirt-light.jpg',
        categoryId: 'uniform',
        subsCategoryId: 'tshirts',
        season: 'summer',
        avialableSizes: ['46-3', '48-3', '50-3', '52-3', '54-3'],
    },
];