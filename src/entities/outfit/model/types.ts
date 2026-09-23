export type OutfitSeason =
    | 'summer'
    | 'demi-season'
    | 'winter';

export interface Outfit {
    id: string;
    name: string;
    image: string;
    season: OutfitSeason;
    variant?: string;
    products: string[];
}
