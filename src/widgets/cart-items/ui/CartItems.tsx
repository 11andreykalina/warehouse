import { mockCategories } from '@/entities/category';
import { mockProducts } from '@/entities/product';
import { removeFromCart, updateCartItemQuantity, useCartItems } from '@/entities/cart';
import { Button, ImageWithFallback } from '@/shared/ui';

export function CartItems() {
  const items = useCartItems();

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <h2>Заявка пока пуста</h2>
        <p>Добавьте позиции из каталога, чтобы отправить заявку на получение.</p>
      </div>
    );
  }

  return (
    <div className="stack-list">
      {items.map((item) => {
        const product = mockProducts.find((entry) => entry.id === item.productId);
        const category = product
          ? mockCategories.find((entry) => entry.id === product.categoryId)?.name ?? 'Форменное имущество'
          : 'Позиция каталога';

        return (
          <div key={`${item.productId}-${item.size}`} className="cart-item">
            <div className="cart-item__image">
              <ImageWithFallback
                src={product?.image ?? ''}
                alt={product?.name ?? 'Позиция больше недоступна'}
                category={category}
                className="cart-item__image-content"
              />
            </div>
            <div className="cart-item__details">
              <strong>{product?.name ?? 'Позиция больше недоступна в каталоге'}</strong>
              <small>Размер: {item.size}</small>
            </div>
            <div className="cart-item__actions">
              <div className="quantity-control" aria-label={`Количество: ${item.quantity}`}>
                <button
                  type="button"
                  aria-label={`Уменьшить количество позиции ${product?.name ?? item.productId}`}
                  onClick={() => updateCartItemQuantity(item.productId, item.size, item.quantity - 1)}
                >
                  −
                </button>
                <span aria-live="polite">{item.quantity}</span>
                <button
                  type="button"
                  aria-label={`Увеличить количество позиции ${product?.name ?? item.productId}`}
                  onClick={() => updateCartItemQuantity(item.productId, item.size, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <Button type="button" variant="text" onClick={() => removeFromCart(item.productId, item.size)}>
                Удалить
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
