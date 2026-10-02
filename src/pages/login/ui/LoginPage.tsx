import { AuthForm } from '@/features/auth-by-badge';

export function LoginPage() {
  return (
    <main className="page-shell">
      <section className="login-card">
        <p className="eyebrow">Демо-режим</p>
        <h1>Вход в систему</h1>
        <p className="login-card__description">Проверка входа использует только демонстрационные данные проекта.</p>
        <AuthForm />
        <p className="login-card__hint">Для демо: жетон 123456, пароль 123456.</p>
      </section>
    </main>
  );
}
