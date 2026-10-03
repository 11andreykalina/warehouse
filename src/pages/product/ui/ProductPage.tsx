import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

import { mockCategories } from '@/entities/category';
import { mockProducts, type Product } from '@/entities/product';
import { AddToCartButton } from '@/features/add-to-cart';
import { ProductSizeSelector } from '@/features/select-product-size';
import { EmptyState, ImageWithFallback, PageStack } from '@/shared/ui';
import { productBackButtonSx, productDescriptionSx, productDetailsSx, productImageFrameSx, productPageSx, productTitleSx } from './ProductPage.styles';

function getReturnTo(state: unknown) {
  if (
    typeof state === 'object' &&
    state !== null &&
    'returnTo' in state &&
    typeof state.returnTo === 'string' &&
    state.returnTo.startsWith('/') &&
    !state.returnTo.startsWith('//')
  ) {
    return state.returnTo;
  }

  return '/catalog';
}

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
  const location = useLocation();
  const { id } = useParams();
  const product = mockProducts.find((item) => item.id === id);

  if (!product) {
    return (
      <Stack spacing={2}>
        <EmptyState title="Позиция не найдена" description="Возможно, её больше нет в каталоге." />
        <Button component={Link} to="/catalog" variant="outlined" sx={productBackButtonSx}>Вернуться в каталог</Button>
      </Stack>
    );
  }

  return (
    <PageStack>
      <Button component={Link} to={getReturnTo(location.state)} variant="outlined" startIcon={<ArrowBackIcon />} sx={productBackButtonSx}>
        Назад
      </Button>
      <ProductDetails key={product.id} product={product} />
    </PageStack>
  );
}
