import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@/features/theme-toggle';
import { router } from './providers/router';

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
