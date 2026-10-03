import type { UniformGender, UniformService } from '@/shared/model';

export type OutfitSeason = 'summer' | 'winter' | 'demi-season';

export type OutfitPurpose = 'dress' | 'daily' | 'special';

export type OutfitService = UniformService;
export type OutfitGender = UniformGender;

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