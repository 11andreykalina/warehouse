import { Outlet } from 'react-router-dom';

import { AppHeader } from '@/widgets/app-header';
import { BottomNavigation } from '@/widgets/bottom-navigation';

export function AppLayout() {
  return (
    <div className="app-shell">
      <AppHeader />
      <main className="page-shell">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
}
