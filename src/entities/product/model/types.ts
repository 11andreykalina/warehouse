export type ProductSeason = 'all-season' | 'summer' | 'demi-season' | 'winter';

export interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    categoryId: string;
    subsCategoryId: string;
    season: ProductSeason;
    availableSizes: string[];
}