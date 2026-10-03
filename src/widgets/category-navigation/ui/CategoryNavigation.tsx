import { Box, Stack } from '@mui/material';

import { CategoryCard, mockCategories } from '@/entities/category';
import { SectionHeading } from '@/shared/ui';
import { categoryGridSx } from './CategoryNavigation.styles';

export function CategoryNavigation() {
  return (
    <Stack component="section" spacing={2.5}>
      <SectionHeading eyebrow="Быстрый переход" title="Категории имущества" level={2} />
      <Box sx={categoryGridSx}>
        {mockCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </Box>
    </Stack>
  );
}
