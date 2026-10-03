import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Alert,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';

import { CategoryFilter } from '@/features/filter-by-category';
import { SeasonFilter } from '@/features/filter-by-season';
import { mockCategories } from '@/entities/category';
import { getApplicableProductEntitlements, mockProducts } from '@/entities/product';
import { mockUser } from '@/entities/user';
import {
  uniformConditionLabels,
  uniformConditions,
  uniformDutyLabels,
  uniformGenderLabels,
  uniformRankGroupLabels,
  uniformRankGroups,
  uniformServiceLabels,
  uniformServices,
  type UniformCondition,
  type UniformDuty,
  type UniformEligibilityProfile,
  type UniformGender,
  type UniformRankGroup,
  type UniformService,
} from '@/shared/model';
import { EmptyState, PageStack, SectionHeading } from '@/shared/ui';
import { ProductFeed } from '@/widgets/product-feed';

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

export function CatalogPage() {
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

  return (
    <PageStack>
      <Stack component="section" spacing={2.5}>
        <SectionHeading eyebrow="Каталог" title="Форменное имущество" description="Выберите категорию, сезон и размер позиции." />
        <CategoryFilter categories={mockCategories} selected={selectedCategory} onSelect={handleSelectCategory} />
        <SeasonFilter selected={season} onSelect={setSeason} />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <TextField
            select
            label="Служба"
            size="small"
            value={service}
            onChange={(event) => {
              if (isServiceFilter(event.target.value)) {
                setService(event.target.value);
                setDuties([]);
                setConditions([]);
              }
            }}
          >
            <MenuItem value="all">Все службы</MenuItem>
            {uniformServices.map((serviceId) => (
              <MenuItem key={serviceId} value={serviceId}>{uniformServiceLabels[serviceId]}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Пол"
            size="small"
            value={gender}
            onChange={(event) => {
              if (isGenderFilter(event.target.value)) {
                setGender(event.target.value);
              }
            }}
          >
            <MenuItem value="all">Любой</MenuItem>
            {Object.entries(uniformGenderLabels).map(([genderId, label]) => (
              <MenuItem key={genderId} value={genderId}>{label}</MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            control={
              <Switch
                checked={profileOnly}
                onChange={(event) => setProfileOnly(event.target.checked)}
              />
            }
            label="Показать положенное по нормам"
          />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <TextField
            select
            label="Категория состава"
            size="small"
            value={rankGroup}
            onChange={(event) => {
              if (isRankGroup(event.target.value)) {
                setRankGroup(event.target.value);
              }
            }}
          >
            {uniformRankGroups.map((group) => (
              <MenuItem key={group} value={group}>{uniformRankGroupLabels[group]}</MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            control={
              <Checkbox
                checked={duties.includes('external-service')}
                onChange={(event) =>
                  setDuties((current) =>
                    event.target.checked
                      ? [...current, 'external-service']
                      : current.filter((value) => value !== 'external-service'),
                  )
                }
              />
            }
            label={uniformDutyLabels['external-service']}
          />
          {profileService === 'dps'
            ? (['traffic-supervision', 'motorcycle'] as const).map((duty) => (
                <FormControlLabel
                  key={duty}
                  control={
                    <Checkbox
                      checked={duties.includes(duty)}
                      onChange={(event) =>
                        setDuties((current) =>
                          event.target.checked
                            ? [...current, duty]
                            : current.filter((value) => value !== duty),
                        )
                      }
                    />
                  }
                  label={uniformDutyLabels[duty]}
                />
              ))
            : null}
          {profileService === 'pps' ? (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={duties.includes('pps-line')}
                    onChange={(event) =>
                      setDuties((current) =>
                        event.target.checked
                          ? [...current, 'pps-line']
                          : current.filter((value) => value !== 'pps-line'),
                      )
                    }
                  />
                }
                label={uniformDutyLabels['pps-line']}
              />
              {uniformConditions.map((condition) => (
                <FormControlLabel
                  key={condition}
                  control={
                    <Checkbox
                      checked={conditions.includes(condition)}
                      onChange={(event) =>
                        setConditions((current) =>
                          event.target.checked
                            ? [...current, condition]
                            : current.filter((value) => value !== condition),
                        )
                      }
                    />
                  }
                  label={uniformConditionLabels[condition]}
                />
              ))}
            </>
          ) : null}
        </Stack>
        <Alert severity="info">
          Каталог открыт целиком. Подбор по нормам учитывает пол, категорию состава и специальные условия; для следствия отдельной нормы нет. Позиции без проверенной привязки к норме доступны в общем каталоге, но не попадут в профильную выборку.
        </Alert>
      </Stack>

      <Stack component="section" spacing={2}>
        <Typography variant="body2" color="text.secondary">Найдено позиций: {filteredProducts.length}</Typography>
        {filteredProducts.length > 0 ? (
          <ProductFeed
            products={filteredProducts}
            entitlementProfile={profileOnly ? eligibilityProfile : undefined}
          />
        ) : (
          <EmptyState title="Позиции не найдены" description="Попробуйте выбрать другую категорию или сезон." />
        )}
      </Stack>
    </PageStack>
  );
}
