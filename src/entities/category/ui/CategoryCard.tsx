import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, CardActionArea, Typography } from '@mui/material';

import type { Category } from '../model/types';
import { categoryArrowSx, categoryCardSx } from './CategoryCard.styles';

export function CategoryCard({ category }: { category: Category }) {
  return (
    <CardActionArea component={Link} to={`/catalog?category=${category.id}`} sx={categoryCardSx}>
      <Typography>{category.name}</Typography>
      <Box component="span" aria-hidden="true" sx={categoryArrowSx}><ArrowForwardIcon /></Box>
    </CardActionArea>
  );
}
