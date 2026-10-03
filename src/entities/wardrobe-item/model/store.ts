import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLocalDate, isDateOnly } from './expiration';
import type { WardrobeItem } from './types';

const WARDROBE_STORAGE_KEY = 'warehouse:wardrobe';
type NewWardrobeItem = Omit<WardrobeItem, 'id'>;
type WardrobeState = { items: WardrobeItem[]; error: string };

function isWardrobeItem(value: unknown): value is WardrobeItem {
  if (typeof value !== 'object' || value === null) return false;

  const item = value as Record<string, unknown>;
  return (
    typeof item.id === 'string' &&
    typeof item.productId === 'string' &&
    typeof item.name === 'string' &&
    typeof item.image === 'string' &&
    typeof item.category === 'string' &&
    typeof item.size === 'string' &&
    typeof item.issuedAt === 'string' &&
    isDateOnly(item.issuedAt) &&
    typeof item.wearPeriodDays === 'number' &&
    Number.isInteger(item.wearPeriodDays) &&
    item.wearPeriodDays > 0 &&
    typeof item.expiresAt === 'string' &&
    isDateOnly(item.expiresAt) &&
    (item.season === 'all-season' ||
      item.season === 'summer' ||
      item.season === 'demi-season' ||
      item.season === 'winter') &&
    (item.status === 'active' || item.status === 'archived') &&
    (item.archiveReason === undefined ||
      item.archiveReason === 'expired' ||
      item.archiveReason === 'manual') &&
    (item.archivedAt === undefined ||
      (typeof item.archivedAt === 'string' && isDateOnly(item.archivedAt))) &&
    (item.sourceOrderId === undefined || typeof item.sourceOrderId === 'string') &&
    (item.sourceOrderItemId === undefined || typeof item.sourceOrderItemId === 'string')
  );
}

function loadWardrobe(): WardrobeState {
  try {
    const raw = localStorage.getItem(WARDROBE_STORAGE_KEY);
    if (!raw) return { items: [], error: '' };

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isWardrobeItem)) {
      throw new Error('Invalid wardrobe data found in local storage.');
    }

    const today = getLocalDate();
    return {
      items: parsed.map((item) =>
        item.status === 'active' && item.expiresAt <= today
          ? {
              ...item,
              status: 'archived',
              archivedAt: today,
              archiveReason: 'expired',
            }
          : item,
      ),
      error: '',
    };
  } catch (error) {
    console.error('Could not load wardrobe data.', error);
    return {
      items: [],
      error: 'Не удалось прочитать гардероб из хранилища браузера.',
    };
  }
}

export function getWardrobeItems(): WardrobeItem[] {
  const raw = localStorage.getItem(WARDROBE_STORAGE_KEY);
  if (!raw) return [];

  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed) || !parsed.every(isWardrobeItem)) {
    throw new Error('Invalid wardrobe data found in local storage.');
  }

  const today = getLocalDate();
  return parsed.map((item) =>
    item.status === 'active' && item.expiresAt <= today
      ? {
          ...item,
          status: 'archived',
          archivedAt: today,
          archiveReason: 'expired',
        }
      : item,
  );
}

const wardrobeSlice = createSlice({
  name: 'wardrobe',
  initialState: loadWardrobe(),
  reducers: {
    wardrobeItemsAdded: {
      prepare(items: NewWardrobeItem[]) {
        if (
          items.length === 0 ||
          !items.every((item) => isWardrobeItem({ ...item, id: 'validation-id' }))
        ) {
          throw new Error('Cannot add empty or invalid wardrobe items.');
        }

        return {
          payload: items.map((item) => ({
            ...item,
            id: `wardrobe-${crypto.randomUUID()}`,
          })),
        };
      },
      reducer(state, action: PayloadAction<WardrobeItem[]>) {
        const sourceKeys = new Set(
          state.items
            .filter((item) => item.sourceOrderId && item.sourceOrderItemId)
            .map((item) => `${item.sourceOrderId}:${item.sourceOrderItemId}`),
        );
        const today = getLocalDate();

        for (const item of action.payload) {
          if (item.sourceOrderId && item.sourceOrderItemId) {
            const sourceKey = `${item.sourceOrderId}:${item.sourceOrderItemId}`;
            if (sourceKeys.has(sourceKey)) continue;
            sourceKeys.add(sourceKey);
          }

          const expired = item.expiresAt <= today;
          state.items.push({
            ...item,
            status: expired ? 'archived' : item.status,
            archivedAt: expired ? today : item.archivedAt,
            archiveReason: expired ? 'expired' : item.archiveReason,
          });
        }
        state.error = '';
      },
    },
    wardrobeItemArchived(state, action: PayloadAction<string>) {
      const item = state.items.find((candidate) => candidate.id === action.payload);
      if (!item || item.status === 'archived') return;

      item.status = 'archived';
      item.archivedAt = getLocalDate();
      item.archiveReason = 'manual';
    },
    expiredWardrobeItemsArchived(state, action: PayloadAction<string>) {
      for (const item of state.items) {
        if (item.status === 'active' && item.expiresAt <= action.payload) {
          item.status = 'archived';
          item.archivedAt = action.payload;
          item.archiveReason = 'expired';
        }
      }
    },
    wardrobeLoadFailed(state) {
      state.error = 'Не удалось прочитать гардероб из хранилища браузера.';
    },
    wardrobeRestored(_state, action: PayloadAction<WardrobeItem[]>) {
      return { items: action.payload, error: '' };
    },
  },
});

export const {
  wardrobeItemsAdded,
  wardrobeItemArchived,
  expiredWardrobeItemsArchived,
  wardrobeLoadFailed,
  wardrobeRestored,
} = wardrobeSlice.actions;
export const wardrobeReducer = wardrobeSlice.reducer;

export function useWardrobeItems() {
  const dispatch = useDispatch();
  const state = useSelector((root: { wardrobe: WardrobeState }) => root.wardrobe);

  useEffect(() => {
    const refreshExpiredItems = () => dispatch(expiredWardrobeItemsArchived(getLocalDate()));
    refreshExpiredItems();
    const timer = window.setInterval(refreshExpiredItems, 60_000);
    return () => window.clearInterval(timer);
  }, [dispatch]);

  return state;
}
