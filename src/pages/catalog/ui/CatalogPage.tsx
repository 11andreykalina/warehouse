import {
  Alert,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';

import { CategoryFilter } from '@/features/filter-by-category';
import { SeasonFilter } from '@/features/filter-by-season';
import { mockCategories } from '@/entities/category';
import {
  uniformGenderLabels,
  uniformRankGroupLabels,
  uniformRankGroups,
  uniformServiceLabels,
  uniformServices,
} from '@/shared/model';
import { EmptyState, PageStack, SectionHeading } from '@/shared/ui';
import { ProductFeed } from '@/widgets/product-feed';
import { useCatalogFilters } from '../model/useCatalogFilters';

export function CatalogPage() {
  const {
    selectedCategory,
    season,
    gender,
    service,
    rankGroup,
    profileOnly,
    dutyOptions,
    conditionOptions,
    eligibilityProfile,
    filteredProducts,
    handleSelectCategory,
    handleSeasonChange,
    handleServiceChange,
    handleGenderChange,
    handleRankGroupChange,
    handleDutyChange,
    handleConditionChange,
    handleProfileOnlyChange,
  } = useCatalogFilters();

  return (
    <PageStack>
      <Paper
        component="section"
        sx={{
          p: { xs: 2, sm: 2.5, md: 3 },
          borderRadius: 3,
          border: 1,
          borderColor: 'divider',
          background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.9), rgba(13, 20, 31, 0.88))',
          boxShadow: '0 18px 36px rgba(5, 12, 22, 0.24)',
        }}
      >
        <Stack spacing={2.5}>
          <SectionHeading
            eyebrow="Каталог"
            title="Форменное имущество"
            description="Выберите категорию, сезон и размер позиции."
          />
          <CategoryFilter categories={mockCategories} selected={selectedCategory} onSelect={handleSelectCategory} />
          <SeasonFilter selected={season} onSelect={handleSeasonChange} />

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ width: '100%', flexWrap: 'wrap', alignItems: { xs: 'stretch', sm: 'center' } }}
          >
            <TextField
              select
              label="Служба"
              size="small"
              value={service}
              sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: { xs: 0, sm: 180 } }}
              onChange={(event) => handleServiceChange(event.target.value)}
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
              sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: { xs: 0, sm: 180 } }}
              onChange={(event) => handleGenderChange(event.target.value)}
            >
              <MenuItem value="all">Любой</MenuItem>
              {Object.entries(uniformGenderLabels).map(([genderId, label]) => (
                <MenuItem key={genderId} value={genderId}>{label}</MenuItem>
              ))}
            </TextField>
            <FormControlLabel
              sx={{ m: 0, color: 'text.secondary' }}
              control={
                <Switch
                  checked={profileOnly}
                  onChange={(event) => handleProfileOnlyChange(event.target.checked)}
                />
              }
              label="Показать положенное по нормам"
            />
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ width: '100%', flexWrap: 'wrap', alignItems: { xs: 'stretch', sm: 'center' } }}
          >
            <TextField
              select
              label="Категория состава"
              size="small"
              value={rankGroup}
              sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: { xs: 0, sm: 220 } }}
              onChange={(event) => handleRankGroupChange(event.target.value)}
            >
              {uniformRankGroups.map((group) => (
                <MenuItem key={group} value={group}>{uniformRankGroupLabels[group]}</MenuItem>
              ))}
            </TextField>
            {dutyOptions.map(({ duty, label, checked }) => (
              <FormControlLabel
                key={duty}
                sx={{ m: 0, color: 'text.secondary' }}
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => handleDutyChange(duty, event.target.checked)}
                  />
                }
                label={label}
              />
            ))}
            {conditionOptions.map(({ condition, label, checked }) => (
              <FormControlLabel
                key={condition}
                sx={{ m: 0, color: 'text.secondary' }}
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => handleConditionChange(condition, event.target.checked)}
                  />
                }
                label={label}
              />
            ))}
          </Stack>

          <Alert severity="info" sx={{ borderRadius: 2, backgroundColor: 'rgba(142, 175, 224, 0.08)', border: 1, borderColor: 'primary.main' }}>
            Каталог открыт целиком. Подбор по нормам учитывает пол, категорию состава и специальные условия; для следствия отдельной нормы нет. Позиции без проверенной привязки к норме доступны в общем каталоге, но не попадут в профильную выборку.
          </Alert>
        </Stack>
      </Paper>

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
