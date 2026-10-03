import { Link, useLocation } from 'react-router-dom';
import { Box, Button, Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material';

import type { Product } from '../model/types';
import { ImageWithFallback } from '@/shared/ui';
import {
  productActionAreaSx,
  productCardActionSx,
  productCardSx,
  productContentSx,
  productDescriptionSx,
  productImageFrameSx,
  productImageSx,
  productNameSx,
  productSizesSx,
} from './ProductCard.styles';

export function ProductCard({ product, categoryName }: { product: Product; categoryName: string }) {
  const location = useLocation();
  const returnTo = `${location.pathname}${location.search}${location.hash}`;
  const state = { returnTo };

  return (
    <Card component="article" sx={productCardSx}>
      <CardActionArea component={Link} to={`/product/${product.id}`} state={state} sx={productActionAreaSx}>
        <Box sx={productImageFrameSx}>
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            category={categoryName}
            sx={productImageFrameSx}
            imageSx={productImageSx}
          />
        </Box>
        <CardContent sx={productContentSx}>
          <Typography component="h3" variant="subtitle1" sx={productNameSx}>{product.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={productDescriptionSx}>{product.description}</Typography>
          <Stack direction="row" aria-label={`Доступные размеры: ${product.availableSizes.join(', ')}`} sx={productSizesSx}>
            {product.availableSizes.map((size) => (
              <Chip key={size} label={size} size="small" variant="outlined" />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>
      <Box sx={productCardActionSx}>
        <Button component={Link} to={`/product/${product.id}`} state={state} variant="outlined" fullWidth>
          Выбрать размер
        </Button>
      </Box>
    </Card>
  );
}
