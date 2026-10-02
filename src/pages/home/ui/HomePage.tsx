import { Link } from 'react-router-dom';

import { mockProducts } from '@/entities/product';
import { CategoryNavigation } from '@/widgets/category-navigation';
import { OutfitFeed } from '@/widgets/outfit-feed';
import { ProductFeed } from '@/widgets/product-feed';

export function HomePage() {
  const featured = mockProducts.slice(0, 4);

  return (
    <div className="page-stack">
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Склад форменного имущества</p>
          <h1>Всё необходимое для службы — в одном месте</h1>
          <p>Посмотрите каталог, выберите свой размер и отправьте заявку на получение имущества.</p>
          <Link className="button button--primary" to="/catalog">
            Перейти в каталог
          </Link>
        </div>
      </section>

      <CategoryNavigation />

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Каталог</p>
            <h2>Позиции имущества</h2>
          </div>
          <Link className="section-heading__link" to="/catalog">
            Весь каталог →
          </Link>
        </div>
        <ProductFeed products={featured} />
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Подборка</p>
            <h2>Пример готового комплекта</h2>
          </div>
        </div>
        <OutfitFeed />
      </section>
    </div>
  );
}
