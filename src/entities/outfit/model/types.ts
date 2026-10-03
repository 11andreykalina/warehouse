export type OutfitSeason = 'summer' | 'winter' | 'demi-season';

export type OutfitPurpose = 'dress' | 'daily' | 'special';

export type OutfitService = 'general' | 'pps' | 'gibdd';

export type OutfitGender = 'male' | 'female' | 'unisex';

export interface Outfit {
    id: string;
    name: string;
    image: string;
    season: OutfitSeason;
    purpose: OutfitPurpose;
    service: OutfitService;
    gender: OutfitGender;
    productIds: string[];
}