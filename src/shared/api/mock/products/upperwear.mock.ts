import type { Product } from '@/entities/product';

export const mockUpperwear: Product[] = [
    {
        id: 'upperwear-polo-dark-001',
        name: 'Рубашка типа «поло» тёмно-синего цвета',
        description:
            'Рубашка типа «поло» тёмно-синего цвета',
        image: '/images/products/upperwear/polo-dark.jpg',
        categoryId: 'uniform',
        subsCategoryId: 'polo',
        season: 'summer',
        avialableSizes: ['46-3', '48-3', '50-3', '52-3', '54-3'],
    },
    {
        id: 'upperwear-polo-light-001',
        name: 'Рубашка типа «поло» белого цвета',
        description:
            'Рубашка типа «поло» белого цвета',
        image: '/images/products/upperwear/polo-light.jpg',
        categoryId: 'uniform',
        subsCategoryId: 'polo',
        season: 'summer',
        avialableSizes: ['46-3', '48-3', '50-3', '52-3', '54-3'],
    },
    {
        id: 'upperwear-jacket-long-sleeve-001',
        name: 'Куртка костюма летнего',
        description:
            'Куртка костюма летнего',
        image: '/images/products/upperwear/jacket-long-sleeve.jpg',
        categoryId: 'outerwear',
        subsCategoryId: 'summer-outerwear',
        season: 'summer',
        avialableSizes: ['46-3', '48-3', '50-3', '52-3', '54-3'],
    },
    {
        id: 'upperwear-jacket-short-sleeve-001',
        name: 'Куртка костюма повседневного облегчённого',
        description:
            'Куртка костюма повседневного облегчённого',
        image: '/images/products/upperwear/jacket-short-sleeve.jpg',
        categoryId: 'outerwear',
        subsCategoryId: 'summer-outerwear',
        season: 'summer',
        avialableSizes: ['46-3', '48-3', '50-3', '52-3', '54-3'],
    },
];