import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

import { mockCategories } from '@/entities/category';
import { formatProductEntitlement, mockProducts, type Product } from '@/entities/product';
import { AddToCartButton } from '@/features/add-to-cart';
import { ProductSizeSelector } from '@/features/select-product-size';
import { uniformGenderLabels, uniformServiceLabels } from '@/shared/model';
import { EmptyState, ImageWithFallback, PageStack } from '@/shared/ui';
import { productDescriptionSx, productDetailsSx, productImageFrameSx, productPageSx, productTitleSx } from './ProductPage.styles';

function ProductDetails({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState('');
  const category = mockCategories.find((item) => item.id === product.categoryId)?.name ?? 'Форменное имущество';

  return (
    <Paper component="article" sx={productPageSx}>
      <Box sx={productImageFrameSx}>
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          category={category}
          sx={productImageFrameSx}
        />
      </Box>
      <Stack sx={productDetailsSx}>
        <Stack spacing={0.5}>
          <Typography variant="overline" color="primary.main">{category}</Typography>
          <Typography component="h1" sx={productTitleSx}>{product.name}</Typography>
        </Stack>
        <Typography sx={productDescriptionSx}>{product.description}</Typography>
        <Typography variant="body2" color="text.secondary">
          {uniformGenderLabels[product.gender]} · {product.services.map((service) => uniformServiceLabels[service]).join(', ')}
        </Typography>
        {product.entitlements.map((entitlement) => (
          <Typography key={`${entitlement.norm}-${entitlement.quantity}`} variant="body2" color="text.secondary">
            {formatProductEntitlement(entitlement)}
            {entitlement.note ? ` · ${entitlement.note}` : ''}
          </Typography>
        ))}
        {product.availableSizes.length > 0 ? (
          <ProductSizeSelector
            sizes={product.availableSizes}
            selected={selectedSize}
            onSelect={setSelectedSize}
          />
        ) : (
          <Typography color="error.main">Для этой позиции пока не указаны размеры.</Typography>
        )}
        <AddToCartButton productId={product.id} size={selectedSize} disabled={!selectedSize} />
      </Stack>
    </Paper>
  );
}

export function ProductPage() {
  const { id } = useParams();
  const product = mockProducts.find((item) => item.id === id);

  if (!product) {
    return (
      <Stack spacing={2}>
        <EmptyState title="Позиция не найдена" description="Возможно, её больше нет в каталоге." />
        <Button component={Link} to="/catalog" variant="outlined">Вернуться в каталог</Button>
      </Stack>
    );
  }

  return (
    <PageStack>
      <ProductDetails key={product.id} product={product} />
    </PageStack>
  );
}
