import { getApplicableUniformNorms, type UniformEligibilityProfile } from '@/shared/model';
import type { Product, ProductEntitlement } from './types';

export function getApplicableProductEntitlements(
  product: Product,
  profile: UniformEligibilityProfile,
): ProductEntitlement[] {
  if (
    (product.gender !== 'unisex' && product.gender !== profile.gender) ||
    (!product.services.includes('general') && !product.services.includes(profile.service))
  ) {
    return [];
  }

  const applicableNorms = getApplicableUniformNorms(profile);

  return product.entitlements
    .filter(
      (entitlement) =>
        applicableNorms.includes(entitlement.norm) &&
        (entitlement.requiredDuties ?? []).every((duty) => profile.duties.includes(duty)) &&
        (entitlement.excludedConditions ?? []).every(
          (condition) => !profile.conditions.includes(condition),
        ),
    )
    .map((entitlement) => {
      const addedYears = (entitlement.periodAdjustments ?? [])
        .filter((adjustment) => applicableNorms.includes(adjustment.norm))
        .reduce((total, adjustment) => total + adjustment.years, 0);

      const adjustedPeriod =
        addedYears > 0 && entitlement.period.unit === 'years'
          ? { ...entitlement.period, value: entitlement.period.value + addedYears }
          : entitlement.period;
      const override = entitlement.periodOverrides?.find((candidate) =>
        candidate.requiredDuties.every((duty) => profile.duties.includes(duty)),
      );

      if (!override && adjustedPeriod === entitlement.period) {
        return entitlement;
      }

      return {
        ...entitlement,
        period: override?.period ?? adjustedPeriod,
        note: override?.note ?? entitlement.note,
      };
    });
}
