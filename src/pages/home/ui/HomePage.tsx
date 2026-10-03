import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Stack, Typography } from '@mui/material';

import { mockProducts } from '@/entities/product';
import { PageStack, SectionHeading } from '@/shared/ui';
import { CategoryNavigation } from '@/widgets/category-navigation';
import { OutfitFeed } from '@/widgets/outfit-feed';
import { ProductFeed } from '@/widgets/product-feed';
import {
  heroContentSx,
  heroDescriptionSx,
  heroEmblemSx,
  heroEyebrowSx,
  heroSx,
  heroTitleSx,
  heroButtonSx,
  homeSectionSx,
  homeStackSx,
  sectionLinkSx,
} from './HomePage.styles';

export function HomePage() {
  const featured = mockProducts.slice(0, 4);

  return (
    <PageStack sx={homeStackSx}>
      <Box component="section" sx={heroSx}>
        <Box component="img" src="/images/branding/mvd-emblem.svg" alt="" aria-hidden="true" sx={heroEmblemSx} />
        <Stack sx={heroContentSx}>
          <Typography variant="overline" sx={heroEyebrowSx}>Склад форменного имущества</Typography>
          <Typography component="h1" sx={heroTitleSx}>Всё необходимое для службы — в одном месте</Typography>
          <Typography sx={heroDescriptionSx}>Посмотрите каталог, выберите свой размер и отправьте заявку на получение имущества.</Typography>
          <Button component={Link} to="/catalog" variant="contained" color="secondary" endIcon={<ArrowForwardIcon />} sx={heroButtonSx}>
            Перейти в каталог
          </Button>
        </Stack>
      </Box>

      <CategoryNavigation />

      <Stack component="section" sx={homeSectionSx}>
        <SectionHeading
          eyebrow="Каталог"
          title="Позиции имущества"
          level={2}
          action={<Button component={Link} to="/catalog" endIcon={<ArrowForwardIcon />} sx={sectionLinkSx}>Весь каталог</Button>}
        />
        <ProductFeed products={featured} />
      </Stack>

      <Stack component="section" sx={homeSectionSx}>
        <SectionHeading
          eyebrow="Подборка"
          title="Готовые комплекты"
          level={2}
          action={<Button component={Link} to="/outfits" endIcon={<ArrowForwardIcon />} sx={sectionLinkSx}>Все комплекты</Button>}
        />
        <OutfitFeed horizontal />
      </Stack>
    </PageStack>
  );
}
