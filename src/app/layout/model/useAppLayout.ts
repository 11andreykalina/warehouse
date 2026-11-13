import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useAppLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';
  const fallbackTo = pathname.startsWith('/outfit/')
    ? '/outfits'
    : pathname.startsWith('/product/')
      ? '/catalog'
      : '/';
  const [query, setQuery] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedQuery = query.trim();
    navigate(normalizedQuery ? `/search?q=${encodeURIComponent(normalizedQuery)}` : '/search');
  };

  const handleQueryChange = (nextQuery: string) => setQuery(nextQuery);

  return { isHomePage, fallbackTo, query, handleSubmit, handleQueryChange };
}
