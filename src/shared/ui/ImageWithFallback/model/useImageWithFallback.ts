import { useState } from 'react';

export function useImageWithFallback() {
  const [unavailable, setUnavailable] = useState(false);

  return {
    unavailable,
    markUnavailable: () => setUnavailable(true),
  };
}
