import { WardrobeOverview } from '@/widgets/wardrobe-overview';

export function WardrobePage() {
  return (
    <div className="page-stack">
      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Выданное имущество</p>
            <h1>Мой гардероб</h1>
          </div>
        </div>
        <WardrobeOverview />
      </section>
    </div>
  );
}
