import type { Product } from '@/entities/product';

export const mockHeadwear: Product[] = [
    {
        id: 'headwear-kepi-summer-001',
        name: 'Кепка летняя нового образца',
        description:
            'Летняя форменная кепка тёмно-синего цвета нового образца.',
        image: '/images/products/headwear/kepi-summer.jpg',
        categoryId: 'headwear',
        subsCategoryId: 'caps',
        season: 'summer',
        avialableSizes: ['56', '57', '58', '59', '60'],
    },
    {
        id: 'headwear-furazhka-001',
        name: 'Фуражка форменная',
        description: 'Форменная фуражка.',
        image: '/images/products/headwear/furazhka.jpg',
        categoryId: 'headwear',
        subsCategoryId: 'furazhki',
        season: 'summer',
        avialableSizes: ['56', '57', '58', '59', '60'],
    },
];