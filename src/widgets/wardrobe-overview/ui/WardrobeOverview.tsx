import { Alert, Stack, Tab, Tabs } from '@mui/material';

import {
  WardrobeItemCard,
} from '@/entities/wardrobe-item';
import { EmptyState, FeedGrid } from '@/shared/ui';
import { useWardrobeOverview } from '../model/useWardrobeOverview';

export function WardrobeOverview() {
  const {
    tab,
    storageError,
    activeItems,
    archivedItems,
    visibleItems,
    emptyStateTitle,
    emptyStateDescription,
    handleTabChange,
  } = useWardrobeOverview();

  return (
    <Stack spacing={2}>
      {storageError ? <Alert severity="error">{storageError}</Alert> : null}
      <Tabs
        value={tab}
        onChange={handleTabChange}
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
          title={emptyStateTitle}
          description={emptyStateDescription}
        />
      )}
    </Stack>
  );
}
