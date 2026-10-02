import { Input } from '@/shared/ui';

export function SearchProducts({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="search-box">
      <Input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Поиск по продуктам" />
    </div>
  );
}
