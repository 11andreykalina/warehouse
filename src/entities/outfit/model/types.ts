export type OutfitSeason = 'summer' | 'winter' | 'demi-season';

export type OutfitPurpose = 'dress' | 'daily' | 'special';

export interface Outfit {
    id: string;
    name: string;
    image: string;
    season: OutfitSeason;
    purpose: OutfitPurpose;
    productIds: string[];
}