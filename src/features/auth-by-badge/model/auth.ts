const AUTH_STORAGE_KEY = 'isAuthenticated';

export function setAuthenticated() {
  localStorage.setItem(AUTH_STORAGE_KEY, 'true');
}

export function getAuthenticated() {
  return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}

export function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
