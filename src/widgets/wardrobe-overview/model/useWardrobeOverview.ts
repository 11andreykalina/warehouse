import { useMemo, useState, type SyntheticEvent } from 'react';

import { useWardrobeItems } from '@/entities/wardrobe-item';

type WardrobeTab = 'active' | 'archived';

export function useWardrobeOverview() {
  const { items, error: storageError } = useWardrobeItems();
  const [tab, setTab] = useState<WardrobeTab>('active');

  const activeItems = useMemo(() => items.filter((item) => item.status === 'active'), [items]);
  const archivedItems = useMemo(() => items.filter((item) => item.status === 'archived'), [items]);
  const visibleItems = tab === 'active' ? activeItems : archivedItems;

  const handleTabChange = (_: SyntheticEvent, value: WardrobeTab) => setTab(value);

  return {
    tab,
    storageError,
    activeItems,
    archivedItems,
    visibleItems,
    handleTabChange,
  };
}
