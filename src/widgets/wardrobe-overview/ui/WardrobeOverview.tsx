import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';

import { mockCategories } from '@/entities/category';
import {
  getApplicableProductEntitlements,
  formatProductEntitlement,
  mockProducts,
  type ProductEntitlement,
} from '@/entities/product';
import { mockUser } from '@/entities/user';
import {
  addDaysToDate,
  getDaysForPeriod,
  getLocalDate,
  isDateOnly,
  wardrobeItemsAdded,
  useWardrobeItems,
  WardrobeItemCard,
} from '@/entities/wardrobe-item';
import { EmptyState, FeedGrid } from '@/shared/ui';

type WardrobeTab = 'active' | 'archived';

const entitlementProfile = {
  gender: mockUser.measurements.gender ?? 'male',
  rankGroup: mockUser.service.rankGroup,
  service: mockUser.service.uniformService,
  duties: mockUser.service.uniformDuties,
  conditions: mockUser.service.uniformConditions,
};

function getWearEntitlement(productId: string): ProductEntitlement | undefined {
  const product = mockProducts.find((candidate) => candidate.id === productId);
  return product ? getApplicableProductEntitlements(product, entitlementProfile)[0] : undefined;
}

export function WardrobeOverview() {
  const dispatch = useDispatch();
  const { items, error: storageError } = useWardrobeItems();
  const [tab, setTab] = useState<WardrobeTab>('active');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [productId, setProductId] = useState(mockProducts[0]?.id ?? '');
  const [size, setSize] = useState('');
  const [issuedAt, setIssuedAt] = useState(getLocalDate());
  const [actionError, setActionError] = useState('');
  const product = mockProducts.find((candidate) => candidate.id === productId);
  const entitlement = getWearEntitlement(productId);
  const wearPeriodDays =
    entitlement && isDateOnly(issuedAt)
      ? getDaysForPeriod(issuedAt, entitlement.period)
      : undefined;

  const activeItems = useMemo(() => items.filter((item) => item.status === 'active'), [items]);
  const archivedItems = useMemo(() => items.filter((item) => item.status === 'archived'), [items]);
  const visibleItems = tab === 'active' ? activeItems : archivedItems;
  const validForm =
    product !== undefined &&
    product.availableSizes.includes(size) &&
    isDateOnly(issuedAt) &&
    wearPeriodDays !== undefined;

  const resetForm = () => {
    setProductId(mockProducts[0]?.id ?? '');
    setSize('');
    setIssuedAt(getLocalDate());
    setActionError('');
  };

  const handleAddItem = () => {
    if (!validForm || !product || wearPeriodDays === undefined) {
      setActionError('Выберите позицию с настроенным нормативным сроком, размер и дату получения.');
      return;
    }

    try {
      const expiresAt = addDaysToDate(issuedAt, wearPeriodDays);
      const expired = expiresAt <= getLocalDate();
      dispatch(wardrobeItemsAdded([
        {
          productId: product.id,
          name: product.name,
          image: product.image,
          season: product.season,
          category: mockCategories.find((category) => category.id === product.categoryId)?.name ?? 'Форменное имущество',
          size,
          issuedAt,
          wearPeriodDays,
          expiresAt,
          status: expired ? 'archived' : 'active',
        },
      ]));
      setDialogOpen(false);
      resetForm();
    } catch (submitError) {
      console.error('Could not add an item to the wardrobe.', submitError);
      setActionError('Не удалось сохранить вещь. Проверьте свободное место в хранилище браузера и повторите попытку.');
    }
  };

  return (
    <Stack spacing={2}>
      {storageError ? <Alert severity="error">{storageError}</Alert> : null}
      {actionError ? <Alert severity="error">{actionError}</Alert> : null}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        sx={{ justifyContent: 'space-between' }}
      >
        <Tabs
          value={tab}
          onChange={(_, value: WardrobeTab) => setTab(value)}
          aria-label="Разделы гардероба"
        >
          <Tab value="active" label={`В гардеробе (${activeItems.length})`} />
          <Tab value="archived" label={`Архив (${archivedItems.length})`} />
        </Tabs>
        <Button variant="contained" onClick={() => setDialogOpen(true)}>
          Добавить полученную вещь
        </Button>
      </Stack>

      {visibleItems.length > 0 ? (
        <FeedGrid>
          {visibleItems.map((item) => (
            <WardrobeItemCard
              key={item.id}
              item={item}
            />
          ))}
        </FeedGrid>
      ) : (
        <EmptyState
          title={tab === 'active' ? 'Гардероб пока пуст' : 'Архив пока пуст'}
          description={
            tab === 'active'
              ? 'Добавьте полученную вещь. Срок носки будет рассчитан по применимой норме.'
              : 'Здесь будут вещи, для которых истёк установленный нормативом срок носки.'
          }
        />
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Добавить полученную вещь</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Запишите ранее полученную вещь. Срок носки определяется нормой снабжения; от указанной даты получения будет рассчитан обратный отсчёт.
            </Typography>
            <TextField
              select
              label="Позиция каталога"
              value={productId}
              onChange={(event) => {
                const nextProduct = mockProducts.find((candidate) => candidate.id === event.target.value);
                if (nextProduct) {
                  setProductId(nextProduct.id);
                  setSize(nextProduct.availableSizes[0] ?? '');
                }
              }}
            >
              {mockProducts.map((candidate) => (
                <MenuItem key={candidate.id} value={candidate.id}>{candidate.name}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Размер"
              value={size}
              onChange={(event) => setSize(event.target.value)}
              disabled={!product}
            >
              {product?.availableSizes.map((availableSize) => (
                <MenuItem key={availableSize} value={availableSize}>{availableSize}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Дата получения"
              type="date"
              value={issuedAt}
              onChange={(event) => {
                setIssuedAt(event.target.value);
              }}
              slotProps={{ inputLabel: { shrink: true } }}
            />
            {entitlement && wearPeriodDays !== undefined ? (
              <Typography variant="caption" color="text.secondary">
                По норме: {wearPeriodDays} дн. · {formatProductEntitlement(entitlement)}. Дата окончания срока носки: {new Date(`${addDaysToDate(issuedAt, wearPeriodDays)}T00:00:00`).toLocaleDateString('ru-RU')}
              </Typography>
            ) : (
              <Alert severity="warning">
                Для этой позиции нет подтверждённого нормативного срока. Нельзя добавить её в гардероб, пока каталог не будет дополнен.
              </Alert>
            )}
            {actionError ? <Alert severity="error">{actionError}</Alert> : null}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Отмена</Button>
          <Button variant="contained" onClick={handleAddItem} disabled={!validForm}>
            Сохранить в гардероб
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
