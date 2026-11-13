import { useMemo, useState, type SyntheticEvent } from 'react';

import { useWardrobeItems } from '@/entities/wardrobe-item';

type WardrobeTab = 'active' | 'archived';

export function useWardrobeOverview() {
  const { items, error: storageError } = useWardrobeItems();
  const [tab, setTab] = useState<WardrobeTab>('active');

  const activeItems = useMemo(() => items.filter((item) => item.status === 'active'), [items]);
  const archivedItems = useMemo(() => items.filter((item) => item.status === 'archived'), [items]);
  const visibleItems = tab === 'active' ? activeItems : archivedItems;
  const emptyStateTitle = tab === 'active' ? 'Гардероб пока пуст' : 'Архив пока пуст';
  const emptyStateDescription =
    tab === 'active'
      ? 'Полученные со склада вещи появятся здесь после подтверждения выдачи в разделе «Заявки».'
      : 'Истёкшие вещи автоматически перемещаются сюда из гардероба.';

  const handleTabChange = (_: SyntheticEvent, value: WardrobeTab) => setTab(value);

  return {
    tab,
    storageError,
    activeItems,
    archivedItems,
    visibleItems,
    emptyStateTitle,
    emptyStateDescription,
    handleTabChange,
  };
}
