import { useMemo, useState } from 'react';
import { Alert, Stack, Tab, Tabs } from '@mui/material';

import {
  useWardrobeItems,
  WardrobeItemCard,
} from '@/entities/wardrobe-item';
import { EmptyState, FeedGrid } from '@/shared/ui';

type WardrobeTab = 'active' | 'archived';

export function WardrobeOverview() {
  const { items, error: storageError } = useWardrobeItems();
  const [tab, setTab] = useState<WardrobeTab>('active');

  const activeItems = useMemo(() => items.filter((item) => item.status === 'active'), [items]);
  const archivedItems = useMemo(() => items.filter((item) => item.status === 'archived'), [items]);
  const visibleItems = tab === 'active' ? activeItems : archivedItems;

  return (
    <Stack spacing={2}>
      {storageError ? <Alert severity="error">{storageError}</Alert> : null}
      <Tabs
        value={tab}
        onChange={(_, value: WardrobeTab) => setTab(value)}
        aria-label="Разделы гардероба"
      >
        <Tab value="active" label={`В гардеробе (${activeItems.length})`} />
        <Tab value="archived" label={`Архив (${archivedItems.length})`} />
      </Tabs>

      {visibleItems.length > 0 ? (
        <FeedGrid>
          {visibleItems.map((item) => (
            <WardrobeItemCard key={item.id} item={item} />
          ))}
        </FeedGrid>
      ) : (
        <EmptyState
          title={tab === 'active' ? 'Гардероб пока пуст' : 'Архив пока пуст'}
          description={
            tab === 'active'
              ? 'Полученные со склада вещи появятся здесь после подтверждения выдачи в разделе «Заявки».'
              : 'Истёкшие вещи автоматически перемещаются сюда из гардероба.'
          }
        />
      )}
    </Stack>
  );
}
