import type { Product } from '@/entities/product';

export const mockUpperwear: Product[] = [
    {
        id: 'upperwear-polo-dark-001',
        name: 'Поло тёмно-синее',
        description:
            'Форменное поло тёмно-синего цвета.',
        image: '/images/products/upperwear/polo-dark.jpg',
        categoryId: 'uniform',
        subsCategoryId: 'polo',
        season: 'summer',
        avialableSizes: ['46-3', '48-3', '50-3', '52-3', '54-3'],
    },
    {
        id: 'upperwear-polo-light-001',
        name: 'Поло светлое',
        description:
            'Форменное поло светлого цвета.',
        image: '/images/products/upperwear/polo-light.jpg',
        categoryId: 'uniform',
        subsCategoryId: 'polo',
        season: 'summer',
        avialableSizes: ['46-3', '48-3', '50-3', '52-3', '54-3'],
    },
    {
        id: 'upperwear-jacket-long-sleeve-001',
        name: 'Куртка с длинным рукавом',
        description:
            'Форменная куртка с длинным рукавом.',
        image: '/images/products/upperwear/jacket-long-sleeve.jpg',
        categoryId: 'outerwear',
        subsCategoryId: 'summer-outerwear',
        season: 'summer',
        avialableSizes: ['46-3', '48-3', '50-3', '52-3', '54-3'],
    },
    {
        id: 'upperwear-jacket-short-sleeve-001',
        name: 'Куртка с коротким рукавом',
        description:
            'Форменная куртка с коротким рукавом.',
        image: '/images/products/upperwear/jacket-short-sleeve.jpg',
        categoryId: 'outerwear',
        subsCategoryId: 'summer-outerwear',
        season: 'summer',
        avialableSizes: ['46-3', '48-3', '50-3', '52-3', '54-3'],
    },
];