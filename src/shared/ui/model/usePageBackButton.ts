import { useNavigate } from 'react-router-dom';

export function usePageBackButton(fallbackTo: string) {
  const navigate = useNavigate();

  const handleBack = () => {
    const historyIndex = window.history.state?.idx;
    if (typeof historyIndex === 'number' && historyIndex > 0) {
      navigate(-1);
      return;
    }

    navigate(fallbackTo);
  };

  return handleBack;
}
