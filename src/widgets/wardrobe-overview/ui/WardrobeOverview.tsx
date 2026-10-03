import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';

import { mockCategories } from '@/entities/category';
import { getApplicableProductEntitlements, mockProducts } from '@/entities/product';
import { mockUser } from '@/entities/user';
import {
  addDaysToDate,
  getDaysForPeriod,
  getLocalDate,
  isDateOnly,
  wardrobeItemArchived,
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

function getSuggestedWearPeriod(productId: string, issueDate: string) {
  const product = mockProducts.find((candidate) => candidate.id === productId);
  const entitlement = product
    ? getApplicableProductEntitlements(product, entitlementProfile)[0]
    : undefined;

  return product && entitlement && isDateOnly(issueDate)
    ? String(getDaysForPeriod(issueDate, entitlement.period))
    : '';
}

export function WardrobeOverview() {
  const dispatch = useDispatch();
  const { items, error: storageError } = useWardrobeItems();
  const [tab, setTab] = useState<WardrobeTab>('active');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [productId, setProductId] = useState(mockProducts[0]?.id ?? '');
  const [size, setSize] = useState('');
  const [issuedAt, setIssuedAt] = useState(getLocalDate());
  const [wearPeriodDays, setWearPeriodDays] = useState(() =>
    getSuggestedWearPeriod(mockProducts[0]?.id ?? '', getLocalDate()),
  );
  const [alreadyExpired, setAlreadyExpired] = useState(false);
  const [actionError, setActionError] = useState('');
  const product = mockProducts.find((candidate) => candidate.id === productId);

  const activeItems = useMemo(() => items.filter((item) => item.status === 'active'), [items]);
  const archivedItems = useMemo(() => items.filter((item) => item.status === 'archived'), [items]);
  const visibleItems = tab === 'active' ? activeItems : archivedItems;
  const parsedDays = Number(wearPeriodDays);
  const validForm =
    product !== undefined &&
    product.availableSizes.includes(size) &&
    isDateOnly(issuedAt) &&
    Number.isInteger(parsedDays) &&
    parsedDays > 0;

  const resetForm = () => {
    setProductId(mockProducts[0]?.id ?? '');
    setSize('');
    setIssuedAt(getLocalDate());
    setWearPeriodDays(getSuggestedWearPeriod(mockProducts[0]?.id ?? '', getLocalDate()));
    setAlreadyExpired(false);
    setActionError('');
  };

  const handleAddItem = () => {
    if (!validForm || !product) {
      setActionError('Выберите позицию и размер, укажите дату получения и срок носки в целых днях.');
      return;
    }

    try {
      const expiresAt = addDaysToDate(issuedAt, parsedDays);
      const today = getLocalDate();
      const expired = alreadyExpired || expiresAt <= today;
      dispatch(wardrobeItemsAdded([
        {
          productId: product.id,
          name: product.name,
          image: product.image,
          season: product.season,
          category: mockCategories.find((category) => category.id === product.categoryId)?.name ?? 'Форменное имущество',
          size,
          issuedAt,
          wearPeriodDays: parsedDays,
          expiresAt,
          status: expired ? 'archived' : 'active',
          ...(expired
            ? {
                archivedAt: today,
                archiveReason: 'expired' as const,
              }
            : {}),
        },
      ]));
      setDialogOpen(false);
      resetForm();
    } catch (submitError) {
      console.error('Could not add an item to the wardrobe.', submitError);
      setActionError('Не удалось сохранить вещь. Проверьте свободное место в хранилище браузера и повторите попытку.');
    }
  };

  const handleArchive = (itemId: string) => {
    try {
      dispatch(wardrobeItemArchived(itemId));
      setActionError('');
    } catch (archiveError) {
      console.error('Could not archive wardrobe item.', archiveError);
      setActionError('Не удалось переместить вещь в архив.');
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
              onArchive={tab === 'active' ? handleArchive : undefined}
            />
          ))}
        </FeedGrid>
      ) : (
        <EmptyState
          title={tab === 'active' ? 'Гардероб пока пуст' : 'Архив пока пуст'}
          description={
            tab === 'active'
              ? 'Добавьте вещь после получения со склада и укажите срок её носки.'
              : 'Здесь будут вещи с истёкшим сроком носки и те, которые перемещены в архив вручную.'
          }
        />
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Добавить полученную вещь</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Запишите новую выдачу или ранее полученную вещь. Если по профилю есть норма для позиции, срок предложен в днях; истёкшая вещь автоматически попадёт в архив.
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
                  setWearPeriodDays(getSuggestedWearPeriod(nextProduct.id, issuedAt));
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
                const nextIssueDate = event.target.value;
                setIssuedAt(nextIssueDate);
                setWearPeriodDays(getSuggestedWearPeriod(productId, nextIssueDate));
              }}
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="Срок носки, дней"
              type="number"
              value={wearPeriodDays}
              onChange={(event) => setWearPeriodDays(event.target.value)}
              slotProps={{ htmlInput: { min: 1, step: 1 } }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={alreadyExpired}
                  onChange={(event) => setAlreadyExpired(event.target.checked)}
                />
              }
              label="Отметить срок носки истёкшим"
            />
            {validForm && !alreadyExpired ? (
              <Typography variant="caption" color="text.secondary">
                Дата окончания срока носки: {new Date(`${addDaysToDate(issuedAt, parsedDays)}T00:00:00`).toLocaleDateString('ru-RU')}
              </Typography>
            ) : null}
            {actionError ? <Alert severity="error">{actionError}</Alert> : null}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Отмена</Button>
          <Button variant="contained" onClick={handleAddItem}>Сохранить в гардероб</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
