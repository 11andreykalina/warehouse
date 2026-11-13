import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getApplicableProductEntitlements, mockProducts } from '@/entities/product';
import { mockUser } from '@/entities/user';
import {
  uniformRankGroups,
  uniformServices,
  type UniformCondition,
  type UniformDuty,
  type UniformEligibilityProfile,
  type UniformGender,
  type UniformRankGroup,
  type UniformService,
} from '@/shared/model';

type Season = 'all' | 'summer' | 'demi-season' | 'winter';
type GenderFilter = 'all' | UniformGender;
type ServiceFilter = 'all' | UniformService;

const serviceFilters: ServiceFilter[] = ['all', ...uniformServices];
const genderFilters: GenderFilter[] = ['all', 'male', 'female', 'unisex'];

function isServiceFilter(value: string): value is ServiceFilter {
  return serviceFilters.some((service) => service === value);
}

function isGenderFilter(value: string): value is GenderFilter {
  return genderFilters.some((gender) => gender === value);
}

function isRankGroup(value: string): value is UniformRankGroup {
  return uniformRankGroups.some((group) => group === value);
}

export function useCatalogFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const [season, setSeason] = useState<Season>('all');
  const [gender, setGender] = useState<GenderFilter>('all');
  const [service, setService] = useState<ServiceFilter>('all');
  const [rankGroup, setRankGroup] = useState(mockUser.service.rankGroup);
  const [duties, setDuties] = useState<UniformDuty[]>(mockUser.service.uniformDuties);
  const [conditions, setConditions] = useState<UniformCondition[]>(mockUser.service.uniformConditions);
  const [profileOnly, setProfileOnly] = useState(false);

  const profileGender =
    gender === 'male' || gender === 'female'
      ? gender
      : mockUser.measurements.gender ?? 'male';
  const profileService =
    service === 'all' ? mockUser.service.uniformService : service;
  const eligibilityProfile = useMemo<UniformEligibilityProfile>(
    () => ({
      gender: profileGender,
      rankGroup,
      service: profileService,
      duties,
      conditions,
    }),
    [conditions, duties, profileGender, profileService, rankGroup],
  );

  const filteredProducts = useMemo(
    () =>
      mockProducts.filter((product) => {
        const categoryMatches = selectedCategory ? product.categoryId === selectedCategory : true;
        const seasonMatches =
          season === 'all' || product.season === season || product.season === 'all-season';
        const genderMatches =
          gender === 'all' || product.gender === gender || product.gender === 'unisex';
        const serviceMatches =
          service === 'all' ||
          product.services.includes('general') ||
          product.services.includes(service);
        const matchesProfile =
          getApplicableProductEntitlements(product, eligibilityProfile).length > 0;

        return (
          categoryMatches &&
          seasonMatches &&
          genderMatches &&
          serviceMatches &&
          (!profileOnly || matchesProfile)
        );
      }),
    [eligibilityProfile, gender, profileOnly, season, selectedCategory, service],
  );

  const handleSelectCategory = (categoryId: string | null) => {
    setSearchParams(categoryId ? { category: categoryId } : {});
  };

  const handleServiceChange = (value: string) => {
    if (isServiceFilter(value)) {
      setService(value);
      setDuties([]);
      setConditions([]);
    }
  };

  const handleGenderChange = (value: string) => {
    if (isGenderFilter(value)) {
      setGender(value);
    }
  };

  const handleRankGroupChange = (value: string) => {
    if (isRankGroup(value)) {
      setRankGroup(value);
    }
  };

  const handleDutyChange = (duty: UniformDuty, checked: boolean) => {
    setDuties((current) =>
      checked
        ? [...current, duty]
        : current.filter((value) => value !== duty),
    );
  };

  const handleConditionChange = (condition: UniformCondition, checked: boolean) => {
    setConditions((current) =>
      checked
        ? [...current, condition]
        : current.filter((value) => value !== condition),
    );
  };

  return {
    selectedCategory,
    season,
    gender,
    service,
    rankGroup,
    duties,
    conditions,
    profileOnly,
    profileService,
    eligibilityProfile,
    filteredProducts,
    handleSelectCategory,
    setSeason,
    handleServiceChange,
    handleGenderChange,
    handleRankGroupChange,
    handleDutyChange,
    handleConditionChange,
    setProfileOnly,
  };
}
