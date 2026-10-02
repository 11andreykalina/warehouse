import { useState } from 'react';

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  category: string;
  className: string;
};

export function ImageWithFallback({ src, alt, category, className }: ImageWithFallbackProps) {
  const [unavailable, setUnavailable] = useState(false);

  if (unavailable || !src) {
    return (
      <div className={`${className} image-fallback`} role="img" aria-label={`${alt}. Фото пока не добавлено.`}>
        <span className="image-fallback__mark" aria-hidden="true">
          Фото
        </span>
        <span className="image-fallback__label">{category}</span>
      </div>
    );
  }

  return <img className={className} src={src} alt={alt} onError={() => setUnavailable(true)} />;
}
