import type { Product } from '@/entities/product';

export const mockFootwear: Product[] = [
    {
        id: 'footwear-low-shoes-001',
        name: 'Полуботинки чёрные',
        description:
            'Форменные полуботинки чёрного цвета.',
        image: '/images/products/footwear/low-shoes.jpg',
        categoryId: 'shoes',
        subsCategoryId: 'low-shoes',
        season: 'summer',
        avialableSizes: ['39', '40', '41', '42', '43', '44', '45'],
    },
    {
        id: 'footwear-high-ankle-boots-001',
        name: 'Ботинки с высокими берцами',
        description:
            'Форменные ботинки с высокими берцами чёрного цвета.',
        image: '/images/products/footwear/high-ankle-boots.jpg',
        categoryId: 'shoes',
        subsCategoryId: 'boots',
        season: 'summer',
        avialableSizes: ['39', '40', '41', '42', '43', '44', '45'],
    },
    {
        id: 'footwear-shoes-001',
        name: 'Туфли чёрные',
        description:
            'Форменные туфли чёрного цвета.',
        image: '/images/products/footwear/shoes.jpg',
        categoryId: 'shoes',
        subsCategoryId: 'shoes',
        season: 'summer',
        avialableSizes: ['39', '40', '41', '42', '43', '44', '45'],
    },
];