import { FeedGrid } from '@/shared/ui';
import { EmptyState } from '@/shared/ui';
import { WardrobeItemCard, mockWardrobeItems } from '@/entities/wardrobe-item';

export function WardrobeOverview() {
  if (mockWardrobeItems.length === 0) {
    return (
      <EmptyState title="Данных о выданном имуществе пока нет" description="Здесь будут отображаться позиции, уже полученные вами со склада." />
    );
  }

  return (
    <FeedGrid>
      {mockWardrobeItems.map((item) => (
        <WardrobeItemCard key={item.id} item={item} />
      ))}
    </FeedGrid>
  );
}
