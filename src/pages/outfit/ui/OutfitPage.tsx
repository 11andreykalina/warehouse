import { Link, useLocation, useParams } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Alert, Box, Chip, List, ListItem, ListItemButton, ListItemText, Paper, Stack, Typography } from '@mui/material';

import { mockCategories } from '@/entities/category';
import { mockOutfits, outfitGenderLabels, outfitPurposeLabels, outfitSeasonLabels, outfitServiceLabels } from '@/entities/outfit';
import { mockProducts } from '@/entities/product';
import { AddOutfitToCart } from '@/features/add-outfit-to-cart';
import { EmptyState, ImageWithFallback, PageStack, SectionHeading } from '@/shared/ui';
import {
  outfitDetailsContentSx,
  outfitDetailsSx,
  outfitImageFrameSx,
  outfitImageSx,
  outfitProductLinkSx,
  outfitProductsListSx,
  outfitTagsSx,
} from './OutfitPage.styles';

export function OutfitPage() {
  const { id } = useParams();
  const location = useLocation();
  const outfit = mockOutfits.find((item) => item.id === id);

  if (!outfit) {
    return (
      <EmptyState title="Комплект не найден" description="Возможно, его больше нет в подборке." />
    );
  }

  const products = outfit.productIds
    .map((productId) => mockProducts.find((product) => product.id === productId))
    .filter((product) => product !== undefined);
  const hasMissingProducts = products.length !== outfit.productIds.length;
  const hasNoProducts = products.length === 0;
  const returnTo = `${location.pathname}${location.search}${location.hash}`;

  return (
    <PageStack>
      <Paper component="article" sx={outfitDetailsSx}>
        <Box sx={outfitImageFrameSx}>
          <ImageWithFallback src={outfit.image} alt={outfit.name} category="Комплект формы" imageSx={outfitImageSx} />
        </Box>
        <Stack sx={outfitDetailsContentSx}>
          <Stack spacing={0.5}>
            <Typography variant="overline" color="primary.main">{outfitPurposeLabels[outfit.purpose]}</Typography>
            <Typography component="h1" variant="h4">{outfit.name}</Typography>
          </Stack>
          <Stack direction="row" sx={outfitTagsSx}>
            <Chip label={outfitSeasonLabels[outfit.season]} />
            <Chip label={outfitServiceLabels[outfit.service]} variant="outlined" />
            <Chip label={outfitGenderLabels[outfit.gender]} variant="outlined" />
          </Stack>
          <Typography color="text.secondary">
            {hasNoProducts
              ? 'Состав этого комплекта ещё формируется.'
              : `В комплект входит ${products.length} ${products.length === 1 ? 'позиция' : 'позиций'}. Выберите размер каждой позиции, чтобы добавить комплект в заявку.`}
          </Typography>
          {hasMissingProducts ? <Alert severity="warning">Некоторые товары из комплекта недоступны в каталоге.</Alert> : null}
          {hasNoProducts ? <Alert severity="info">Сначала добавьте товары и их размеры в состав комплекта. Заказ пока недоступен.</Alert> : null}
          <AddOutfitToCart outfitName={outfit.name} products={products} disabled={hasMissingProducts} />
        </Stack>
      </Paper>

      <Stack component="section" spacing={2}>
        <SectionHeading eyebrow="Состав" title="Товары в комплекте" level={2} />
        {hasNoProducts ? (
          <EmptyState title="Состав комплекта формируется" description="Товары появятся здесь после добавления в каталог." />
        ) : (
          <List sx={outfitProductsListSx}>
            {products.map((product) => {
              const categoryName = mockCategories.find((category) => category.id === product.categoryId)?.name;

              return (
                <ListItem key={product.id} disablePadding divider>
                  <ListItemButton component={Link} to={`/product/${product.id}`} state={{ returnTo }} sx={outfitProductLinkSx}>
                    <ListItemText
                      primary={product.name}
                      secondary={`${categoryName ?? 'Форменное имущество'} · Размеры: ${product.availableSizes.join(', ') || 'не указаны'}`}
                    />
                    <ArrowForwardIcon color="action" fontSize="small" />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        )}
      </Stack>
    </PageStack>
  );
}