import { WardrobeItemCard, mockWardrobeItems } from '@/entities/wardrobe-item';

export function WardrobeOverview() {
  if (mockWardrobeItems.length === 0) {
    return (
      <div className="empty-state">
        <h2>Данных о выданном имуществе пока нет</h2>
        <p>Здесь будут отображаться позиции, уже полученные вами со склада.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {mockWardrobeItems.map((item) => (
        <WardrobeItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
