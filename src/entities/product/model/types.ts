import type {
    UniformCondition,
    UniformDuty,
    UniformGender,
    UniformNorm,
    UniformService,
} from '@/shared/model';

export type ProductSeason = 'all-season' | 'summer' | 'demi-season' | 'winter';
export type WearPeriodUnit = 'days' | 'years';

export interface ProductEntitlement {
    norm: UniformNorm;
    period: {
        value: number;
        unit: WearPeriodUnit;
    };
    quantity: string;
    isDemoDefault?: boolean;
    periodAdjustments?: Array<{
        norm: UniformNorm;
        years: number;
    }>;
    periodOverrides?: Array<{
        requiredDuties: UniformDuty[];
        period: {
            value: number;
            unit: WearPeriodUnit;
        };
        note: string;
    }>;
    requiredDuties?: UniformDuty[];
    excludedConditions?: UniformCondition[];
    note?: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    categoryId: string;
    subsCategoryId: string;
    season: ProductSeason;
    availableSizes: string[];
    gender: UniformGender;
    services: UniformService[];
    entitlements: ProductEntitlement[];
}