import { Link, useLocation } from 'react-router-dom';
import { Box, Button, Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material';

import type { Product, ProductEntitlement } from '../model/types';
import { formatProductEntitlement } from '../model/labels';
import { ImageWithFallback } from '@/shared/ui';
import { uniformGenderLabels, uniformServiceLabels } from '@/shared/model';
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

export function ProductCard({
  product,
  categoryName,
  entitlements = product.entitlements,
}: {
  product: Product;
  categoryName: string;
  entitlements?: ProductEntitlement[];
}) {
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
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.5 }}>
            <Chip label={uniformGenderLabels[product.gender]} size="small" />
            {product.services.map((service) => (
              <Chip key={service} label={uniformServiceLabels[service]} size="small" variant="outlined" />
            ))}
          </Stack>
          {entitlements.map((entitlement) => (
            <Stack key={`${entitlement.norm}-${entitlement.quantity}`} spacing={0.25}>
              <Typography variant="caption" color="text.secondary">
                {formatProductEntitlement(entitlement)}
              </Typography>
              {entitlement.note ? (
                <Typography variant="caption" color="text.secondary">{entitlement.note}</Typography>
              ) : null}
            </Stack>
          ))}
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
